import React, { FC, useState } from 'react';
import cx from 'classnames';

import { ReactComponent as Arrow } from './vertical-arrow.svg';

import css from './expanded-row.module.css';

interface IExpandedRowProps {
  title: string;
  className?: string;
  controls?: JSX.Element | JSX.Element[];
}

const ExpandedRow: FC<IExpandedRowProps> = ({
  title,
  className,
  controls,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const classNames = cx(css.content, className);
  const arrowClassNames = cx({
    [css.arrowUp]: isOpen,
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.block}>
      <a className={css.header} onClick={handleClick} role='anchor'>
        <div className={css.titleWrapper}>
          <Arrow className={arrowClassNames} />
          <h2 className={css.title}>{title}</h2>
        </div>
        <div className={css.controls}>{controls}</div>
      </a>
      {isOpen && (
        <div className={classNames} data-testid='child-content'>
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandedRow;
