import { IOption } from 'model/option';
import { StylesConfig } from 'react-select/src/styles';

type IsMulti = false;

export const CUSTOM_STYLES: StylesConfig<IOption, IsMulti> = {
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-m)',
    color: state.isDisabled
      ? 'var(--grey)'
      : state.isSelected
      ? 'var(--bright-light)'
      : 'var(--primary)',
    backgroundColor: state.isSelected
      ? 'var(--primary)'
      : state.isFocused
      ? 'var(--primary-light)'
      : 'var(--bright-light)',
    '&:active': {
      backgroundColor: 'var(--primary-light)',
    },
    padding: '0px 12px',
    margin: 0,
    lineHeight: '32px',
    cursor: 'pointer',
  }),
  valueContainer: (provided) => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? 'var(--grey-light)'
      : 'var(--bright-light)',
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-m)',
    lineHeight: '24px',
    paddingLeft: 2,
    paddingRight: 2,
    minHeight: 40,
    borderColor: state.isFocused
      ? 'var(--primary)'
      : state.isDisabled
      ? 'var(--grey)'
      : 'var(--secondary-light)',
    '&:hover': {
      borderColor: state.isFocused ? 'var(--primary)' : 'var(--secondary)',
    },
    outline: 'none',
    boxShadow: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
    fontSize: 'var(--font-size-s)',
    color: 'var(--secondary-light)',
    border: '1px solid var(--secondary-light)',
    boxShadow: '0px 2px 10px var(--shadow-primary-light)',
    backgroundColor: 'var(--bright-light)',
    marginTop: 4,
    zIndex: 2,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: 150,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'var(--grey)' : 'var(--primary)',
  }),
  indicatorSeparator: (provided, { selectProps = {} }) => ({
    ...provided,
    backgroundColor: selectProps.isDisabled
      ? 'var(--primary-light)'
      : 'var(--secondary-light)',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'var(--grey)' : 'var(--secondary-light)',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'var(--bright-light)',
    width: 0,
    height: 0,
    padding: 0,
    margin: '16px 12px 16px 14px',
    borderRadius: 10,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: state.isDisabled
      ? '5.5px solid var(--secondary-light)'
      : state.isFocused
      ? '5.5px solid var(--primary)'
      : '5.5px solid var(--secondary)',
    cursor: 'pointer',
    '& svg': { fill: 'var(--bright-light)' },
    '&:hover': {
      borderTop: '5.5px solid var(--primary)',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'var(--secondary)',
    padding: 10,
    paddingTop: 12,
    paddingLeft: 0,
    cursor: 'pointer',
    '&:hover': {
      color: 'var(--primary)',
    },
    '& svg': {
      width: 18,
      height: 18,
    },
  }),
  multiValue: (provided, state) => ({
    ...provided,
    fontFamily: 'var(--font-family-primary)',
    backgroundColor: state.isDisabled
      ? 'var(--primary-light)'
      : 'var(--primary-light)',
    borderRadius: 4,
    paddingLeft: 8,
    marginRight: 8,
    fontSize: 'var(--font-size-m)',
    color: 'var(--primary)',
    lineHeight: '20px',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    marginTop: -1,
    height: 40,
    alignSelf: 'center',
  }),
};
