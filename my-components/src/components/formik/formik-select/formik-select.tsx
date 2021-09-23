import { FieldProps } from 'formik';
import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';

interface Option {
  label: string;
  value: string;
}

interface IFormikSelectProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
  isClearable?: boolean;
}

const FormikSelect = ({
  field,
  form,
  options,
  isClearable = false,
}: IFormikSelectProps) => {
  const onChange = (option: ValueType<Option | Option[], boolean>) => {
    form.setFieldValue(field.name, (option as Option).value);
  };

  const getValue = () => {
    if (options) {
      return options.find((option) => option.value === field.value);
    } else {
      return '' as any;
    }
  };

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isClearable={isClearable}
    />
  );
};

export default FormikSelect;
