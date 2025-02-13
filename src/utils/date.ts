import { setHours, setMinutes, setSeconds } from 'date-fns';

export const getTimeDate = (date: Date, stringTime: string): Date => {
  const [hours, minutes, seconds] = stringTime.split(':');

  const dateWithTime = setHours(
    setMinutes(setSeconds(date, +seconds), +minutes),
    +hours
  );

  return dateWithTime;
};
