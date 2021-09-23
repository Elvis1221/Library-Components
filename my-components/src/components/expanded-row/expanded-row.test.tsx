import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ExpandedRow from 'components/expanded-row/expanded-row';
import { getRandomString } from 'mock/index';

describe('Expandable Row', () => {
  const props = {
    title: getRandomString(),
    children: getRandomString(),
  };

  it('contains title', () => {
    const { getByText } = render(<ExpandedRow {...props} />);

    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('renders open by default', () => {
    const { getByText } = render(<ExpandedRow {...props} />);

    expect(getByText(props.children)).toBeInTheDocument();
  });

  it('should show/hide content by click', () => {
    const { getByRole, queryByTestId } = render(<ExpandedRow {...props} />);

    const link = getByRole('anchor');
    expect(queryByTestId('child-content')).not.toBeNull();

    fireEvent.click(link);

    expect(queryByTestId('child-content')).toBeNull();

    fireEvent.click(link);

    expect(queryByTestId('child-content')).not.toBeNull();
  });
});
