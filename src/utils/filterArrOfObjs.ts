/*
  A generic utility function that allows us to filter
  an array of objects either through equality checks
  or through a custom filter handler.

  Filter object passed must be in the following format:

  {
    keyToFilter: string | array | custom,
    keyToFilter: string | array | custom,
    ...
  }

  Custom filter handlers must pass the following:

  {
    value: string;
    handler: function;
  }
*/

export default function filterArrOfObjs<T, K extends keyof T>(
  data: T[],
  filter: any,
) {
  return data.filter(obj => {
    let validObj = true;
    const keys = Object.keys(filter) as K[];

    keys.forEach(key => {
      // Check if the filter passed is using an array
      if (Array.isArray(filter[key])) {
        if (filter[key].length !== 0 && !filter[key].includes(obj[key])) {
          validObj = false;
        }
      }
      // Check if the filter passed is a custom filter handler
      else if (
        typeof filter[key] === 'object' &&
        Object.keys(filter[key]).includes('handler')
      ) {
        if (!filter[key].handler(obj[key])) {
          validObj = false;
        }
      }
      // Check if the filter passed is just a value to equality check
      else if (filter[key] !== '' && filter[key] !== obj[key]) {
        validObj = false;
      }
    });

    return validObj;
  });
}
