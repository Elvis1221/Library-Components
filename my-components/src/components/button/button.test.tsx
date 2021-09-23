import { fireEvent, render } from '@testing-library/react';
import Button, { ButtonsThemes, ButtonsType } from './button';

describe('Button', () => {
  const onClick = jest.fn();
  const testProps = {
    onClick: onClick,
    children: <div>Click Me</div>,
    className: 'test',
  };

  it('renders the button with children', () => {
    const wrapper = render(<Button {...testProps} />);

    expect(wrapper.container).not.toBeEmptyDOMElement();
  });

  it('checks click on button', () => {
    const { getByText } = render(<Button {...testProps} />);

    fireEvent.click(getByText('Click Me'));

    expect(onClick).toHaveBeenCalled();
  });

  it('checks className of button', () => {
    const { getByRole } = render(<Button {...testProps} />);

    expect(getByRole('button')).toHaveClass('test');
  });

  it('checks type of button', () => {
    const { getByRole, rerender } = render(<Button {...testProps} />);

    expect(getByRole('button')).toHaveAttribute('type', 'button');

    rerender(<Button {...testProps} type={ButtonsType.submit} />);

    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('checks theme of button', () => {
    const { getByRole, rerender } = render(<Button {...testProps} />);

    expect(getByRole('button')).toHaveClass('dark');

    rerender(<Button {...testProps} theme={ButtonsThemes.light} />);

    expect(getByRole('button')).not.toHaveClass('dark');
    expect(getByRole('button')).toHaveClass('light');
  });
});
