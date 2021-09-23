import { IOption } from 'model/option';

const convertToSelectData = (
  label: string,
  value?: number | string,
): IOption => ({
  label,
  value: value?.toString() || label,
});

export default convertToSelectData;
