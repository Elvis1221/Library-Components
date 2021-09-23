import { MouseEventHandler } from 'react';

import { INamedObjectWithId, INamedObjectWithNumberId } from 'model/common';

export interface IInitialValues {
  desiredDestinationId: string;
  otherDesiredDestination: string;
  relocationInterestId?: string;
  interestDate?: string;
  planedDepartureDate: any;
  familyOptionId: string;
  comment: string;
  otherFamilyOptions: string;
  statusId: string;
}

export interface IRelocationFormType {
  renderChildren: ({
    values,
    key,
    desiredDestination,
    prepareRelocationInterest,
    familyOptions,
  }: {
    values: IInitialValues;
    key: number;
    desiredDestination: INamedObjectWithNumberId[];
    prepareRelocationInterest: any;
    familyOptions: INamedObjectWithId[];
  }) => JSX.Element;
}
export interface IActionButtons {
  onLeaveForm: MouseEventHandler<HTMLButtonElement>;
}

export interface IConfigProps {
  values: IInitialValues;
  dirty: boolean;
  desiredDestinations: INamedObjectWithNumberId;
}
