import React, { useContext } from 'react';

import { ICurrentPerson } from 'components/user-info/user-info';
import { IResult } from 'pages/relocation/relocation.const';
import { IWave } from 'constants/waves.const';
import { INamedObjectWithId, INamedObjectWithNumberId } from 'model/common';
import { IOption } from 'model/option';
import {
  Filter,
  filterInitial,
} from 'components/relocation-header/config-filters';
import {
  WaveFilter,
  waveFilterInitial,
} from 'components/waves-header/config-wave-filters';

export enum ExternalFiltersConst {
  clients = 'clients',
  divisions = 'divisions',
  peopleNames = 'peopleNames',
  projectsNames = 'projectsNames',
}

export type ExternalFilters = {
  [K in ExternalFiltersConst]: INamedObjectWithId[];
};

export type ContextValue =
  | ICurrentPerson
  | IResult[]
  | Filter
  | IOption[]
  | IWave[]
  | INamedObjectWithId[]
  | INamedObjectWithNumberId[]
  | ExternalFilters
  | boolean
  | string
  | string[];

export type ContextValueSetter = (field: string, value: ContextValue) => void;

export type RelocatorListUpdater = (
  id: string[],
  values: Partial<IResult>,
) => void;

export interface IAppInitialStateProps {
  currentPerson: ICurrentPerson;
  relocators: IResult[];
  loading: boolean;
  avatar: string;
  statuses: INamedObjectWithId[];
  waves: IWave[];
  locations: INamedObjectWithNumberId[];
  relocationInterests: INamedObjectWithId[];
  familyOptions: INamedObjectWithId[];
  waveStatuses: INamedObjectWithId[];
  externalFilters: ExternalFilters;
  selectedRequestIds: string[];
  filterField: Filter;
  options: Filter;
  waveFilterField: WaveFilter;
  waveOptions: WaveFilter;
  setContextValue?: ContextValueSetter;
  updateRelocatorsList?: RelocatorListUpdater;
}

export const appInitialState: IAppInitialStateProps = {
  currentPerson: {} as ICurrentPerson,
  relocators: [] as IResult[],
  loading: true,
  avatar: '' as string,
  locations: [] as INamedObjectWithNumberId[],
  relocationInterests: [] as INamedObjectWithId[],
  familyOptions: [] as INamedObjectWithId[],
  statuses: [] as INamedObjectWithId[],
  waves: [] as IWave[],
  waveStatuses: [] as INamedObjectWithId[],
  selectedRequestIds: [] as string[],
  externalFilters: {
    clients: [],
    divisions: [],
    peopleNames: [],
    projectsNames: [],
  } as ExternalFilters,
  options: filterInitial,
  waveFilterField: {} as WaveFilter,
  waveOptions: waveFilterInitial,
  filterField: {} as Filter,
};

export const useAppContext = (): IAppInitialStateProps =>
  useContext(AppContext);

const AppContext = React.createContext(appInitialState);

export default AppContext;
