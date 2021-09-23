import toast from './toast.util';

export type Errors = [{ message: string }] | number;

export interface DataItem {
  fullName: string;
  fields: string;
}

export const handleApiErrors = (errors: Errors, key: string): void => {
  if (typeof errors === 'number') {
    toast.showOnFailure(`Server responded with a status: ${errors}`);
  } else {
    errors.forEach((err) => {
      toast.showOnFailure(`${key} ${err.message}`);
    });
  }
};

export const handleApiSuccess = (statusCode: Errors, key: string): void => {
  if (typeof statusCode === 'number') {
    toast.showOnSuccess('Your request was successfully submitted');
  } else {
    statusCode.forEach((err) => {
      toast.showOnSuccess(`${key} ${err.message}`);
    });
  }
};

export const handleValidationErrors = (data: [DataItem]): void => {
  data.forEach((item) => {
    Object.entries(item.fields).forEach(([key, value]) => {
      const errorInfo = `${item.fullName}: ${key} - `;
      handleApiErrors(value as unknown as Errors, errorInfo);
    });
  });
};
