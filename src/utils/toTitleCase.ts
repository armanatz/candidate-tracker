export default function toTitleCase(string: string) {
  return string
    .toLowerCase()
    .split(' ')
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
