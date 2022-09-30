import { parse, isValid } from 'date-fns';
import deepClone from './deepClone';

/*
  A generic utility function that sorts an array of
  objects.

  Currently it supports sorting by the following
  data types:

  1. Alphanumeric Strings
  2. Date Strings (yyyy-mm-dd formatted)
  3. Numbers
*/

type SortFunction<T, K> = {
  leftEl: T;
  rightEl: T;
  key: K;
  sortDirection: SortDirection;
};

// Check if passed date string is valid
const isValidDate = (dateString: string, format = 'yyyy-MM-dd') =>
  isValid(parse(dateString, format, new Date()));

// Parse date string into JS Date
const parseDate = (dateString: string, format = 'yyyy-MM-dd') =>
  parse(dateString, format, new Date());

// Custom sort function for the Array.prototype.sort() method
const sortFn = <T, K extends keyof T>({
  leftEl,
  rightEl,
  key,
  sortDirection,
}: SortFunction<T, K>) => {
  const items = [leftEl[key], rightEl[key]];
  const itemTypes = [typeof items[0], typeof items[1]];

  /*
      If the type of both items passed is 'number' then
      we want to perform an arithmetic operation
      on them.
    */
  if (itemTypes.every(item => item === 'number')) {
    return sortDirection === 'asc'
      ? (items[0] as number) - (items[1] as number)
      : (items[1] as number) - (items[0] as number);
  }

  /*
      If the type of both items passed is 'string' then
      we want to do some additional checking to see
      what kind of a string they are.
    */
  if (itemTypes.every(item => item === 'string')) {
    // Check if strings are valid date strings
    if (isValidDate(items[0] as string) && isValidDate(items[1] as string)) {
      // Convert the parsed dates into Epoch time
      const dateA = parseDate(items[0] as string).getTime();
      const dateB = parseDate(items[1] as string).getTime();

      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }

    // Strings are alphanumeric so do a localeCompare instead
    return sortDirection === 'asc'
      ? (items[0] as string).localeCompare(items[1] as string)
      : (items[1] as string).localeCompare(items[0] as string);
  }

  /*
    Failsafe: If the type of the items passed don't match
    'number' or 'string', then we just return 0 so that
    nothing gets sorted.
  */
  return 0;
};

export default function sortArrOfObjs<T, K extends keyof T>(
  data: T[],
  key: K,
  sortDirection: 'asc' | 'desc' = 'asc',
) {
  /*
    Make a clone of the passed data so that we
    don't accidentally mutate it
  */
  const clone = deepClone<T[]>(data);

  clone.sort((a, b) =>
    sortFn<T, K>({
      leftEl: a,
      rightEl: b,
      key,
      sortDirection,
    }),
  );

  return clone;
}
