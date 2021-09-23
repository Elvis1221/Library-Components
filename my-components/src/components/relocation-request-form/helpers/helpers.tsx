import {
  MOVE_WITH,
  READY_RELOCATE,
  RELOCATION_FORM_KEY,
} from '../constants/relocation-request-form.constants';
import { INamedObjectWithId, INamedObjectWithNumberId } from 'model/common';

export const parseDataToRelocationRequest = (
  values: any,
  desiredDestination: INamedObjectWithNumberId[],
  familyOptions: INamedObjectWithId[],
): Record<string, unknown> => {
  const desiredDestinationKey =
    values.desiredDestinationId === MOVE_WITH.OTHER
      ? RELOCATION_FORM_KEY.OTHER_DESIRED_DESTINATION
      : RELOCATION_FORM_KEY.DESIRED_DESTINATION_ID;

  const interestDateKey =
    values.interestDate === READY_RELOCATE.DESIRED_DATES_VALUE
      ? RELOCATION_FORM_KEY.PLANNED_DEPARTURE_DATE
      : RELOCATION_FORM_KEY.RELOCATION_INTEREST_ID;

  const desiredDestinationItem = desiredDestination.find(
    (item: INamedObjectWithNumberId) =>
      item.name === values[desiredDestinationKey],
  );

  const familyOptionItem = familyOptions.find(
    (item: INamedObjectWithId) =>
      item.name === values[RELOCATION_FORM_KEY.FAMILY_OPTION_ID],
  );

  return {
    [desiredDestinationKey]:
      (desiredDestinationItem && desiredDestinationItem.id) ||
      values[desiredDestinationKey],
    [RELOCATION_FORM_KEY.FAMILY_OPTION_ID]: familyOptionItem?.id,
    [RELOCATION_FORM_KEY.OTHER_FAMILY_OPTIONS]:
      values[RELOCATION_FORM_KEY.OTHER_FAMILY_OPTIONS] || null,
    [interestDateKey]: values[interestDateKey].value || values[interestDateKey],
    comment: values.comment || null,
    statusId: values.statusId,
  };
};
