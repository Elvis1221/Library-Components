import React, { FC } from 'react';

import { ReactComponent as Arrow } from './loading-arrow.svg';
import { ReactComponent as Circle } from './loading-circle.svg';

import css from './loading.module.css';
import { LOADING_TITLE } from '../../constants/content.const';

const Loading: FC = () => {
  return (
    <main>
      <div className={css.loading}>
        <Circle className={css.circle} />
        <Arrow className={css.arrow} />
        {LOADING_TITLE.LOADING}
      </div>
    </main>
  );
};

export default Loading;
