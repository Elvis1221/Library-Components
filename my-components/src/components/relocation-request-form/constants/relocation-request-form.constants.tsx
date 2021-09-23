import { IInitialValues } from '../interface/interface-for-relocation-form';

export const initialValues: IInitialValues = {
  desiredDestinationId: '',
  otherDesiredDestination: '',
  relocationInterestId: '',
  interestDate: '',
  planedDepartureDate: '',
  familyOptionId: '',
  comment: '',
  otherFamilyOptions: '',
  statusId: '123e4567-e89b-12d3-a456-426614176100',
};
export const CONFIRM_MODAL_TEXT = {
  HAVE_LEFT_INFO: 'You have left the information.',
  LEAVE_THIS_PAGE: 'Do you want to leave this page and ',
  LOSE_CHANGES: 'lose all changes',
};
export const RELOCATION_FORM_KEY = {
  DESIRED_DESTINATION_ID: 'desiredDestinationId',
  OTHER_DESIRED_DESTINATION: 'otherDesiredDestination',
  PLANNED_DEPARTURE_DATE: 'planedDepartureDate',
  FAMILY_OPTION_ID: 'familyOptionId',
  COMMENT: 'comment',
  OTHER_FAMILY_OPTIONS: 'otherFamilyOptions',
  RELOCATION_INTEREST_ID: 'relocationInterestId',
  INTEREST_DATE: 'interestDate',
};
export const MOVE_WITH = {
  JUST_ME: 'Just me',
  SPOUSE: 'My spouse',
  SPOUSE_KID: 'My spouse and kid(s)',
  OTHER: 'Other',
};
export const READY_RELOCATE = {
  DESIRED_DATES_TITLE: 'Yes, I know desired dates',
  DESIRED_DATES_VALUE: 'desiredDates',
  GATHERING_INFO_TITLE: 'Maybe, I’m gathering the information',
  GATHERING_INFO_VALUE: 'gatheringInfo',
};
export const LABEL_TITLES = {
  READY_RELOCATE: 'Are you ready to relocate?',
  LOCATION: 'What location do you consider going to?',
  PLANNED_DEPARTURE: 'Planned departure month',
  HOW_QUICKLY: 'If you were to move, how quickly',
  MOVE_WITH: 'I am going to move with ...',
  OTHER_COMMENTS: 'Any other questions or comments',
  APPROXIMATE_MONTH: 'We need to know the approximate month',
};
export const ACTION_DATA = {
  CANCEL: 'CANCEL',
  CREATE_REQUEST: 'CREATE REQUEST',
  YES_LEAVE: 'YES, LEAVE',
  NO: 'NO',
  SUBMIT: 'SUBMIT',
};
export const PLACEHOLDER = {
  OTHER_INFO: MOVE_WITH.OTHER,
  ANSWER_HERE: 'Enter your answer here',
  FORMAT_DATES: 'MMM-YYYY',
  ESTIMATED_TIME: 'Estimated time',
};
