import { render, screen } from '@testing-library/react';

import LoadingContainer from './loading-container';
import { LOADING_TITLE } from '../../constants/content.const';

describe('LoadingContainer', () => {
  const children = <p>Test</p>;

  it('should render LoadingContainer component with loading text', () => {
    const { getByText } = render(
      <LoadingContainer isLoading>{children}</LoadingContainer>,
    );

    expect(getByText(LOADING_TITLE.LOADING)).toBeInTheDocument();
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });

  it('should render LoadingContainer component with children', () => {
    const { getByText } = render(
      <LoadingContainer isLoading={false}>{children}</LoadingContainer>,
    );

    expect(getByText(/Test/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Please wait a few seconds/i),
    ).not.toBeInTheDocument();
  });
});
