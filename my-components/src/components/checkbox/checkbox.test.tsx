import { fireEvent, render, screen } from '@testing-library/react';
import { FieldProps } from 'formik';

import Checkbox from 'components/checkbox/chekbox';

const mockFieldProp = (mockField: FieldProps) => mockField;

describe('Formik radio button component', () => {
  const formikCheckbox = () =>
    render(
      <Checkbox id={'testId'} title={'testTitle'} field={mockFieldProp} />,
    );

  it('should render component', () => {
    formikCheckbox();

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should be enabled after check-box click', () => {
    formikCheckbox();

    const checkBox = screen.getByRole('checkbox');

    fireEvent.click(checkBox);

    expect(checkBox).toBeEnabled();
  });

  it('should render component title', () => {
    formikCheckbox();

    expect(screen.getByLabelText(/testTitle/i)).toBeInTheDocument();
  });
});
