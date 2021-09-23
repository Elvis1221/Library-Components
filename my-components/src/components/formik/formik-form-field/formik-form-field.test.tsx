import { render, screen } from '@testing-library/react';

import FormikFormField from 'components/formik/formik-form-field/formik-form-field';

describe('Formik form field component', () => {
  const formikFormField = () =>
    render(
      <FormikFormField
        children={<div>test content</div>}
        label={'test label'}
        required
      />,
    );

  it('should render component', () => {
    const { container } = formikFormField();

    expect(container).not.toBeEmptyDOMElement();
  });

  it('should render children in the component', () => {
    formikFormField();

    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  it('should render label in the component', () => {
    formikFormField();

    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });

  it('should have className by required', () => {
    formikFormField();

    expect(screen.getByText(/test label/i)).toHaveClass('required');
  });
});
