import { getDateRange } from './date-helpers';
import { MaxDetails } from '../constants/date.const';

const mockDateSameYear: Date[] = [
  new Date('Sun Aug 15 2021 02:00:00'),
  new Date('Thu Sep 20 2021 23:59:59'),
];

const mockDateDiffYear: Date[] = [
  new Date('Sun Aug 15 2021 02:00:00'),
  new Date('Thu Sep 20 2022 23:59:59'),
];

const mockDateSameYearSameMonth: Date[] = [
  new Date('Sun Aug 15 2021 02:00:00'),
  new Date('Thu Aug 20 2021 23:59:59'),
];

describe('getDateRange', () => {
  it('getDateRange with values and maxDetails "month" in same year ', () => {
    const rangeDate = getDateRange(mockDateSameYear, MaxDetails.month);

    expect(rangeDate).toBe('15 Aug - 20 Sep 2021');
  });

  it('getDateRange with values and maxDetails "year" in same year', () => {
    const rangeDate = getDateRange(mockDateSameYear, MaxDetails.year);

    expect(rangeDate).toBe('Aug - Sep 2021');
  });

  it('getDateRange with values and maxDetails "month" in differrent years', () => {
    const rangeDate = getDateRange(mockDateDiffYear, MaxDetails.month);

    expect(rangeDate).toBe('15 Aug 2021 - 20 Sep 2022');
  });

  it('getDateRange with values and maxDetails "year" in differrent years', () => {
    const rangeDate = getDateRange(mockDateDiffYear, MaxDetails.year);

    expect(rangeDate).toBe('Aug 2021 - Sep 2022');
  });

  it('getDateRange with values and maxDetails "year" in same month and year', () => {
    const rangeDate = getDateRange(mockDateSameYearSameMonth, MaxDetails.year);

    expect(rangeDate).toBe('Aug 2021');
  });
});
