export default function deepClone<T>(obj: T): T {
  if (typeof obj !== 'undefined') {
    return JSON.parse(JSON.stringify(obj));
  }

  throw new Error(
    'Item passed cannot be cloned as it is undefined',
  );
}
