import React, { FC } from 'react';
import Select, { NamedProps as SelectProps } from 'react-select';

import { CUSTOM_STYLES } from './secelect-field.const';
import {IOption} from "../../model/option";

import css from './select-field.module.css';

interface ISelectFieldProps extends SelectProps {
  label?: string;
  isRequired?: boolean;
  className?: string;
  options?: IOption[];
  value?: IOption | IOption[] | null;
  field?: any;
  form?: any;
  isMulty?: boolean;
}

const SelectField: FC<ISelectFieldProps> = ({
  label,
  className,
  options,
  form,
  field,
  value,
  isMulty = false,
  ...rest
}): JSX.Element => {
  return (
    <div>
      <label className={css.label}>{label}</label>
      <Select
        {...field}
        isMulti={isMulty}
        value={value}
        className={className}
        options={options}
        styles={CUSTOM_STYLES}
        onChange={(value) => {
          form.setFieldValue(field.name, value);
        }}
        {...rest}
      />
    </div>
  );
};

export default SelectField;
