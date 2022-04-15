import formatDuration from 'format-duration';

/**
 * Formats a duration in seconds to a human readable format.
 * @param seconds  number of seconds
 * @returns  string in format '1h 2m 3s'
 */
export const formatTime = (seconds: number) => {
  return formatDuration(seconds * 1000);
};

/**
 * Formats a date to a human readable format.
 * @param date  Date object
 */
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
