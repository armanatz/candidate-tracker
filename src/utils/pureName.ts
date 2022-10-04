export default function pureName(str: string) {
  const salutationMap = new Map([
    ['mr.', 'mr.'],
    ['mr', 'mr'],
    ['mrs.', 'mrs.'],
    ['mrs', 'mrs'],
    ['ms.', 'ms.'],
    ['ms', 'ms'],
    ['miss', 'miss'],
    ['dr.', 'dr.'],
    ['dr', 'dr'],
  ]);

  const otherTitles = new Map([
    ['phd', 'phd'],
    ['dds', 'dds'],
    ['jr.', 'jr.'],
    ['jr', 'jr'],
    ['sr.', 'sr.'],
    ['sr', 'sr'],
    ['i', 'i'],
    ['ii', 'ii'],
    ['iii', 'iii'],
    ['iv', 'iv'],
    ['v', 'v'],
  ]);

  const splitStr = str.split(' ');

  const salutationFound = salutationMap.get(splitStr[0].toLocaleLowerCase());
  const otherTitlesFound = otherTitles.get(
    splitStr[splitStr.length - 1].toLocaleLowerCase(),
  );

  if (salutationFound) {
    splitStr.shift();
  }

  if (otherTitlesFound) {
    splitStr.pop();
  }

  return splitStr.join(' ');
}
