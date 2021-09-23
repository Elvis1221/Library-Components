import moment from 'moment';
import { FormatDateNames, MaxDetails } from '../constants/date.const';

export const getFormattedDate = (
  value: Date | string,
  format: FormatDateNames,
): string => {
  return moment(value).format(format);
};

const formatDate = (start: string[], end: string[]): string => {
  return start.join(' ') + (end.length ? ' - ' + end.join(' ') : '');
};

export const getDateRange = (value: Date[], maxDetail: MaxDetails): string => {
  const [startDate, endDate] = value;
  const momentStartDate = moment(startDate);
  const momentEndDate = moment(endDate);

  const startYear: string = momentStartDate.format('YYYY');
  const endYear: string = momentEndDate.format('YYYY');
  const startMonth: string = momentStartDate.format('MMM');
  const endMonth: string = momentEndDate.format('MMM');
  const startDay: string = momentStartDate.format('DD');
  const endDay: string = momentEndDate.format('DD');

  const start =
    maxDetail === MaxDetails.year
      ? [startMonth, startYear]
      : [startDay, startMonth, startYear];
  const end =
    maxDetail === MaxDetails.year
      ? [endMonth, endYear]
      : [endDay, endMonth, endYear];

  let rangeDate;

  if (startYear !== endYear) {
    rangeDate = formatDate(start, end);
  } else if (startMonth !== endMonth) {
    start.pop();
    rangeDate = formatDate(start, end);
  } else if (startDay !== endDay && !(maxDetail === MaxDetails.year)) {
    start.pop();
    rangeDate = formatDate(start, end);
  } else {
    rangeDate = formatDate(start, []);
  }

  return rangeDate || '';
};
