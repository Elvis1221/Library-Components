import React, { FC } from 'react';
import cx from 'classnames';

import css from './label.module.css';

interface ILabelProps {
  className?: string;
  title?: string;
  required?: boolean;
}

const Label: FC<ILabelProps> = ({ className, title, children, required }) => {
  const classNames = cx([{ [css.required]: required }, css.label]);

  return (
    <div className={className}>
      <p className={classNames}>{title}</p>
      {children}
    </div>
  );
};

export default Label;
