import { INamedObjectWithId } from 'model/common';

export const WAVES_STATUS_MAP = {
  PROCCESSED: 'Proccessed',
  IN_PROGRESS: 'In progress',
  PLANNED: 'planned',
};

export interface IWave {
  id: string;
  name: string;
  destinationId: number; // TO GET LOCATION NAME FIND BY ID LOCATIONS(REACT-CONTEXT)
  countOfPeople: number;
  plannedKickOff: Date;
  relocationDateStart: Date;
  relocationDateEnd: Date;
  status: INamedObjectWithId;
  action: string;
  isExpanded: boolean;
}
