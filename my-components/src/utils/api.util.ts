import axios, { CancelToken, Method } from 'axios';
import {
  handleApiErrors,
  handleApiSuccess,
  handleValidationErrors,
} from './error.util';

class ApiService {
  private readonly apiPrefix: string;
  private token: string;
  private key: string;

  constructor() {
    this.apiPrefix = '/relocation/api/';
    this.token = '';
    this.key = '';
  }

  _getUrl(endpoint: string) {
    return `${this.apiPrefix}${endpoint}`;
  }

  _headers(headers: Headers, token: string) {
    return {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  async request(
    url: string,
    method: Method,
    body?: BodyInit,
    headers?: HeadersInit,
    id?: number,
    cancellationToken?: CancelToken,
  ) {
    if (id) {
      url = `${url}?userId=${id}`;
    }

    if (body && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    const response = await axios(url, {
      method,
      data: body,
      headers: this._headers(headers as Headers, this.token as string),
      cancelToken: cancellationToken,
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);

        return null;
      }

      return thrown;
    });

    const data = response.data;

    const statusCode = response.status;

    if (statusCode === 409) {
      if (data.error && data.error.errors) {
        handleApiErrors(data.error.errors, this.key);
      } else {
        handleValidationErrors(data);
      }
      data.statusCode = statusCode;
      return Promise.reject(data);
    }

    if (statusCode >= 400 && statusCode < 500) {
      if (data.error && data.error.errors) {
        handleApiErrors(data.error.errors, this.key);
      }
      return Promise.reject(data.error);
    }

    if (statusCode >= 500) {
      handleApiErrors(statusCode, this.key);
    }

    if (
      statusCode >= 200 &&
      statusCode < 400 &&
      (method === 'PUT' || method === 'POST')
    ) {
      handleApiSuccess(statusCode, this.key);
    }

    return Promise.resolve(data.result ?? data);
  }

  async get(endpoint: string, id?: number, cancellationToken?: CancelToken) {
    return this.request(
      this._getUrl(endpoint),
      'GET',
      undefined,
      {},
      id,
      cancellationToken,
    );
  }
  // eslint-disable-next-line
  async post(endpoint: string, body: BodyInit) {
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.request(this._getUrl(endpoint), 'POST', body, headers);
  }

  async put(endpoint: string, body: BodyInit) {
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.request(this._getUrl(endpoint), 'PUT', body, headers);
  }

  async remove(endpoint: string, insuredId: number) {
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.request(
      this._getUrl(endpoint),
      'DELETE',
      undefined,
      headers,
      insuredId,
    );
  }
}

export const api = new ApiService();
