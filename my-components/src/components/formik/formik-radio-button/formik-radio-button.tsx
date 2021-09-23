import React from 'react';
import { FieldProps } from 'formik';
import cx from 'classnames';

import css from './formik-radio-button.module.css';

interface IRadioButton {
  label?: string;
  title: string;
  id: string;
  field: (props: FieldProps) => React.ReactNode;
  className: string;
}

const FormikRadioButton: React.FC<IRadioButton> = ({
  id,
  title,
  field,
  className,
  ...props
}) => {
  const classNames = cx(css.container, className);

  return (
    <label htmlFor={id} className={classNames}>
      {title}
      <input id={id} {...field} {...props} />
      <span className={css.checkmark} />
    </label>
  );
};

export default FormikRadioButton;
