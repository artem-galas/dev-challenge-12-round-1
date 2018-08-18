import * as moment from 'moment';

/**
 * TimeInterval
 * @param {string} startTime
 * @param {string} endTime
 * @returns {string}
 *
 * @description
 * Calculate Time interval between to times
 */
export function timeInterval(startTime: string, endTime: string): string {
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  const minutes = end.diff(start, 'minutes');
  const interval = moment().hour(0).minute(minutes);
  return interval.format('HH:mm');
}
