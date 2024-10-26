import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { IGlobalState } from '../interfaces';

export const useTypedSelector: TypedUseSelectorHook<IGlobalState> = useSelector;
