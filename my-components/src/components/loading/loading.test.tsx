import { render } from '@testing-library/react';

import Loading from './loading';
import { LOADING_TITLE } from '../../constants/content.const';

describe('Loading', () => {
  it('should render Loading component with children', () => {
    const { container, getByText } = render(<Loading />);
    const elements = container.childNodes[0].childNodes;

    expect(elements[0].nodeName).toBe('DIV');

    expect(getByText(LOADING_TITLE.LOADING)).toBeInTheDocument();
  });
});
