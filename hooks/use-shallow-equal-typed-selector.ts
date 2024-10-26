import { shallowEqual, TypedUseSelectorHook } from 'react-redux';

import { IGlobalState } from '../interfaces';

import { useTypedSelector } from './use-typed-selector';

export const useShallowEqualTypedSelector: TypedUseSelectorHook<IGlobalState> = selector => {
  return useTypedSelector(selector, shallowEqual);
};
