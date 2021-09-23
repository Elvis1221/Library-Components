import { render, screen } from '@testing-library/react';

import FormikInput, { InputType } from './formik-input';
import { FieldProps } from 'formik';

const mockFieldProp = (mockField: FieldProps) => mockField;

describe('FormikInput component', () => {
  it('should render component', () => {
    render(<FormikInput field={mockFieldProp} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should have className', () => {
    render(<FormikInput field={mockFieldProp} className='testClassName' />);

    expect(screen.getByRole('textbox')).toHaveClass('testClassName');
  });

  it('should be enabled', () => {
    render(<FormikInput field={mockFieldProp} />);

    expect(screen.getByRole('textbox')).toBeEnabled();
  });

  it('should render component as textarea', () => {
    render(<FormikInput field={mockFieldProp} type={InputType.textarea} />);

    expect(screen.getByRole('textbox')).toHaveProperty('type', 'textarea');
  });
});
