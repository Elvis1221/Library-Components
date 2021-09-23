import React from 'react';
import { toast, ToastPosition } from 'react-toastify';

import Toast from 'components/toast/toast';

const TOAST_TYPES_MAP = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

interface IInitialConfig {
  position: ToastPosition;
  newestOnTop: boolean;
  pauseOnVisibilityChange: boolean;
  draggable: boolean;
  hideProgressBar: boolean;
  autoClose: number;
  closeOnClick: boolean;
  rtl: boolean;
}

const initialConfig: IInitialConfig = {
  position: 'bottom-right',
  newestOnTop: true,
  pauseOnVisibilityChange: true,
  draggable: true,
  hideProgressBar: true,
  autoClose: 9000,
  closeOnClick: false,
  rtl: false,
};

export default {
  showOnSuccess(content: string): void {
    this.show(content, TOAST_TYPES_MAP.SUCCESS);
  },
  showOnFailure(content: string): void {
    this.show(content, TOAST_TYPES_MAP.ERROR);
  },
  showWarning(content: string): void {
    this.show(content, TOAST_TYPES_MAP.WARNING);
  },
  showInfo(content: string): void {
    this.show(content, TOAST_TYPES_MAP.INFO);
  },
  show(content: string, type: string): void {
    toast(<Toast type={type}>{content}</Toast>, {
      ...initialConfig,
      toastId: content,
    });
  },
};
