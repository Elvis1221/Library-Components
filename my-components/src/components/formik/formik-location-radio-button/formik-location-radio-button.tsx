import React, { FC } from 'react';
import { FieldProps } from 'formik';

import css from './formik-location-radio-button.module.css';

interface ILocationRadioButtonProps {
  disabled?: boolean;
  id: string;
  title: string;
  icon?: JSX.Element;
  field: (props: FieldProps) => React.ReactNode;
}

const FormikLocationRadioButton: FC<ILocationRadioButtonProps> = ({
  field,
  icon,
  title,
  id,
  ...props
}: ILocationRadioButtonProps) => {
  return (
    <div className={css.locationRadioButton}>
      <input id={id} {...field} {...props} />
      <label htmlFor={id}>
        {icon}
        <span>{title}</span>
      </label>
    </div>
  );
};

export default FormikLocationRadioButton;
