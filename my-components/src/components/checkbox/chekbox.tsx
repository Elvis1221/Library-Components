import React from 'react';
import cx from 'classnames';

import { FieldProps } from 'formik';

import css from './checkbox.module.css';

interface IRadioButton {
  label?: string;
  title?: string;
  id: string;
  form?: FieldProps<string>;
  field?: (props: FieldProps) => React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  value?: string | number | readonly string[];
  onChange?: () => void;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

const Checkbox: React.FC<IRadioButton> = ({
  id,
  title,
  form,
  field,
  onClick,
  className,
  ...props
}) => {
  const classNames = cx(css.container, className);

  return (
    <div className={classNames}>
      <label htmlFor={id} onClick={onClick}>
        {title}
        <input type='checkbox' id={id} {...field} {...props} />
        <span className={css.checkmark} />
      </label>
    </div>
  );
};

export default Checkbox;
