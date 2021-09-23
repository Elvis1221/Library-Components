import { fireEvent, render, screen } from '@testing-library/react';
import { FieldProps } from 'formik';

import FormikLocationRadioButton from 'components/formik/formik-location-radio-button/formik-location-radio-button';

const mockFieldProp = (mockField: FieldProps) => mockField;

describe('Formik location radio button component', () => {
  const formikLocationRadioButton = () =>
    render(
      <FormikLocationRadioButton
        id={'testId'}
        title={'testTitle'}
        field={mockFieldProp}
      />,
    );

  it('should render component', () => {
    formikLocationRadioButton();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should be enabled after radio-button click', () => {
    formikLocationRadioButton();

    const radioButton = screen.getByRole('textbox');

    fireEvent.click(radioButton);

    expect(radioButton).toBeEnabled();
  });

  it('should render component title', () => {
    formikLocationRadioButton();

    expect(screen.getByLabelText(/testTitle/i)).toBeInTheDocument();
  });
});
