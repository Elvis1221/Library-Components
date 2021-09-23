import React, { FC } from 'react';
import { FieldProps } from 'formik';
import classnames from 'classnames';

import css from './formik-input.module.css';

export enum InputType {
  input = 'input',
  textarea = 'textarea',
}

interface InputProps {
  className?: string;
  type?: InputType | string;
  field: (props: FieldProps) => React.ReactNode;
  isDisabled?: boolean;
}

const FormikInput: FC<InputProps> = ({
  field,
  className,
  type = InputType.input,
  isDisabled,
  ...props
}) => {
  const classNames = classnames(css.input, css[type], className);
  const InputNode =
    type === InputType.textarea ? InputType.textarea : InputType.input;

  return (
    <InputNode
      {...field}
      type={type}
      className={classNames}
      disabled={isDisabled}
      {...props}
    />
  );
};

export default FormikInput;
