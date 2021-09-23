import React from 'react';

import Loading from '../loading/loading';

import css from './loading-container.module.css';

interface ILoadingContainer {
  isLoading: boolean;
  children: JSX.Element;
}

const LoadingContainer = ({
  isLoading,
  children,
}: ILoadingContainer): JSX.Element => {
  return isLoading ? (
    <div className={css.wrapper}>
      <Loading />
    </div>
  ) : (
    children
  );
};

export default React.memo(LoadingContainer);
