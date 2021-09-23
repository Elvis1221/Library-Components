import { render, screen } from '@testing-library/react';

import Label from 'components/label/label';

describe('Formik form field component', () => {
  const label = () =>
    render(
      <Label
        children={<div>test content</div>}
        title={'test title'}
        required
      />,
    );

  it('should render component', () => {
    const { container } = label();

    expect(container).not.toBeEmptyDOMElement();
  });

  it('should render children in the component', () => {
    label();

    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  it('should render title in the component', () => {
    label();

    expect(screen.getByText(/test title/i)).toBeInTheDocument();
  });

  it('should have className by required', () => {
    label();

    expect(screen.getByText(/test title/i)).toHaveClass('required');
  });
});
