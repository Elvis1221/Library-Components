import React, { FC, useCallback, useEffect } from 'react';

import css from './modal.module.css';

interface IModalProps {
  display?: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal: FC<IModalProps> = ({ display = false, onClose, children }) => {
  if (!display) {
    return null;
  }

  const closeModalByKey = useCallback(
    (event) => {
      if (event.key === 'Escape' && display) {
        onClose();
      }
    },
    [onClose, display],
  );

  const mouseClickOutSide = useCallback(
    (event) => {
      if (event.target.className === `${css.modalWrapper}` && display) {
        onClose();
      }
    },
    [onClose, display],
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModalByKey);

    return () => document.removeEventListener('keydown', closeModalByKey);
  }, [closeModalByKey]);

  return display ? (
    <div
      className={css.modalWrapper}
      onKeyPress={closeModalByKey}
      onClick={mouseClickOutSide}
    >
      <div className={css.popUpWrapper}>{children}</div>
    </div>
  ) : null;
};

export default Modal;
