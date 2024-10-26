import moment from 'moment';

const getPreviousWorkday = () => {
  const workday = moment();
  const day = workday.day();
  let diff = 1;
  if (day === 0 || day === 1) {
    diff = day + 2;
  }
  return workday.subtract(diff, 'days');
};

const filterCountDates = data => {
  return {
    d0: data.filter(d => moment.utc(d.created_at).isAfter(moment().startOf('day'))).length,
    d1: data.filter(d => moment.utc(d.created_at).isBetween(getPreviousWorkday().startOf('day'), getPreviousWorkday().endOf('day'))).length,
    d7: data.filter(d => moment.utc(d.created_at).isAfter(moment().subtract(1, 'week').endOf('day'))).length,
    d14: data.filter(d => moment.utc(d.created_at).isBetween(moment().subtract(2, 'week').endOf('day'), moment().subtract(1, 'week').endOf('day'))).length,
    d30: data.filter(d => moment.utc(d.created_at).isAfter(moment().subtract(1, 'month').endOf('day'))).length,
    d60: data.filter(d => moment.utc(d.created_at).isBetween(moment().subtract(2, 'month').endOf('day'), moment().subtract(1, 'month').endOf('day'))).length,
  };
};

const getDistinctWeeks = (from, to) => {
  let beginningOfWeek = moment(from).startOf('day');
  const endDate = moment(to).endOf('day');

  const weeks = [];

  while (beginningOfWeek.isBefore(endDate)) {
    const endOfWeek = beginningOfWeek.clone().endOf('isoWeek');
    const endOfPeriod = endOfWeek.isAfter(endDate) ? endDate : endOfWeek;

    const week = {
      start: beginningOfWeek.format(),
      end: endOfPeriod.format(),
    };
    weeks.push(week);

    beginningOfWeek = endOfWeek.clone().add(1, 'days').startOf('day');
  }

  return weeks;
};

export {
  filterCountDates,
  getDistinctWeeks,
  getPreviousWorkday,
};
