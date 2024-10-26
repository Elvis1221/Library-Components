import { useState } from 'react';

export const useInputs = <T>(initialState: T): [T, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [inputs, setValues] = useState<T>(initialState);

  return [
    inputs,
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...inputs,
        [event.target.id]: event.target.value,
      });
    },
  ];
};
