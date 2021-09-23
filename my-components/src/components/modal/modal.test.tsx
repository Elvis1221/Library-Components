import React from 'react';
import Modal from './modal';
import { fireEvent, render } from '@testing-library/react';

describe('Modal', () => {
  it('should render Modal component with children', () => {
    const { getByText } = render(
      <Modal display onClose={() => {}}>
        <div>TestModal</div>
      </Modal>,
    );

    expect(getByText('TestModal')).toBeInTheDocument();
  });

  it('should show modal component', () => {
    const { queryByText, getByText, rerender } = render(
      <Modal onClose={() => {}}>
        <div>TestModal</div>
      </Modal>,
    );

    expect(queryByText('TestModal')).not.toBeInTheDocument();

    rerender(
      <Modal display onClose={() => {}}>
        <div>TestModal</div>
      </Modal>,
    );

    expect(getByText('TestModal')).toBeInTheDocument();
  });

  it('should close Modal component onKeyPress "Escape"', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal display onClose={onClose}>
        <div>TestModal</div>
      </Modal>,
    );

    fireEvent.keyDown(getByText(/TestModal/i), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
