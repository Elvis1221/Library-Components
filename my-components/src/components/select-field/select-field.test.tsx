import React from 'react';
import { render } from '@testing-library/react';
import SelectField from './select-field';
import { IOption } from 'model/option';

const testOptions: IOption[] = [
  { label: 'test1', value: 'test1' },
  { label: 'test2', value: 'test2' },
  { label: 'test3', value: 'test3' },
];

describe('SelectField', () => {
  it('should render SelectField component', () => {
    const { getByText } = render(
      <SelectField
        label='testLabel'
        isRequired={true}
        className={''}
        options={testOptions}
      />,
    );

    expect(getByText('testLabel')).toBeInTheDocument();
    expect(getByText('testLabel')).toHaveClass('label');
  });

  it("shouldn't show requied asterisk SelectField component", () => {
    const { getByText, queryByText } = render(
      <SelectField
        label='testLabel'
        isRequired={false}
        className={''}
        options={testOptions}
      />,
    );

    expect(queryByText('*')).not.toBeInTheDocument();
    expect(getByText('testLabel')).toHaveClass('label');
  });

  it('should show options SelectField component', () => {
    const { getByText } = render(
      <SelectField
        label='testLabel'
        isRequired={true}
        className={''}
        options={testOptions}
        menuIsOpen={true}
      />,
    );

    expect(getByText('test1')).toBeInTheDocument();
  });
});
