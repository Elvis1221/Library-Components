import React, { FC } from 'react';
import { ErrorMessage, FieldAttributes } from 'formik';
import cx from 'classnames';

import Label from '../../label/label';

import css from './formik-form-field.module.css';

interface IFormikFormField {
  children: FieldAttributes<any>;
  showErrorForField?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

const FormikFormField: FC<IFormikFormField> = ({
  children,
  showErrorForField,
  className,
  required,
  label,
}) => {
  const classNames = cx(css.formikFormField, className);

  return (
    <div className={classNames}>
      {children && (
        <Label title={label} required={required} children={children} />
      )}
      {showErrorForField && (
        <ErrorMessage name={showErrorForField}>
          {(msg: string) => <div className={css.errorText}>{msg}</div>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default FormikFormField;
