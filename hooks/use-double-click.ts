import { useEffect } from 'react';

export const useDoubleClick = ({
  ref,
  latency = 250,
  onSingleClick = () => null,
  onDoubleClick = () => null,
}) => {
  useEffect(() => {
    const clickRef = ref.current;
    let clickCount = 0;
    const handleClick = () => {
      clickCount += 1;

      setTimeout(() => {
        if (clickCount === 1) onSingleClick();
        else if (clickCount === 2) onDoubleClick();

        clickCount = 0;
      }, latency);
    };

    clickRef.addEventListener('click', handleClick);

    return () => {
      clickRef.removeEventListener('click', handleClick);
    };
  });
};
