import { fireEvent, render, screen } from '@testing-library/react';
import { FieldProps } from 'formik';

import FormikRadioButton from 'components/formik/formik-radio-button/formik-radio-button';

const mockFieldProp = (mockField: FieldProps) => mockField;

describe('Formik radio button component', () => {
  const formikRadioButton = () =>
    render(
      <FormikRadioButton
        className={'testClassname'}
        field={mockFieldProp}
        id={'testId'}
        title={'testTitle'}
      />,
    );

  it('should render component', () => {
    formikRadioButton();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should be enabled after radio-button click', () => {
    formikRadioButton();

    const radioButton = screen.getByRole('textbox');

    fireEvent.click(radioButton);

    expect(radioButton).toBeEnabled();
  });

  it('should render component title', () => {
    formikRadioButton();

    expect(screen.getByLabelText(/testTitle/i)).toBeInTheDocument();
  });
});
