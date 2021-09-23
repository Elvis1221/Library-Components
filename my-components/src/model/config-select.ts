import { CalendarProps } from 'react-calendar';

import { FiltersKeys } from 'components/relocation-header/config-filters';
import { WaveFiltersKeys } from 'components/waves-header/config-wave-filters';

export interface IConfigFilterSelect {
  label: string;
  name: keyof typeof FiltersKeys;
  placeholder: string;
  isRequired: boolean;
  isData?: boolean;
}

export interface IWaveConfigFilterSelect {
  label: string;
  name: keyof typeof WaveFiltersKeys;
  placeholder: string;
  isRequired: boolean;
  isData?: boolean;
}

export interface IWaveConfigFilterDateSelect extends CalendarProps {
  label: string;
  name: keyof typeof WaveFiltersKeys;
  placeholder: string;
  isRequired: boolean;
  isData?: boolean;
  format?: string;
  selectRange?: boolean;
}
