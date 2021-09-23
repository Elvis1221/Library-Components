import React, { FC } from 'react';
import classnames from 'classnames';

import css from './button.module.css';

export enum ButtonsThemes {
  green = 'green',
  dark = 'dark',
  light = 'light',
  grey = 'grey',
  tableButton = 'tableButton',
}

export enum ButtonsType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

interface IButtonProps extends React.ComponentProps<'button'> {
  theme?: ButtonsThemes;
  type?: ButtonsType;
}

const Button: FC<IButtonProps> = ({
  type = ButtonsType.button,
  children,
  onClick,
  theme = ButtonsThemes.dark,
  className,
  disabled,
}) => {
  const classNames = classnames(css.button, css[theme], className);

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
