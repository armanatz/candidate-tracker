export default function filterArrOfObjs<T, K extends keyof T>(
  data: T[],
  filter: any,
) {
  return data.filter(obj => {
    let validObj = true;
    const keys = Object.keys(filter) as K[];

    keys.forEach(key => {
      if (Array.isArray(filter[key])) {
        if (filter[key].length !== 0 && !filter[key].includes(obj[key])) {
          validObj = false;
        }
      } else if (
        typeof filter[key] === 'object' &&
        Object.keys(filter[key]).includes('handler')
      ) {
        if (!filter[key].handler(obj[key])) {
          validObj = false;
        }
      } else if (filter[key] !== '' && filter[key] !== obj[key]) {
        validObj = false;
      }
    });

    return validObj;
  });
}
