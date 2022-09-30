import { describe, it, expect } from 'vitest';

import deepClone from '../deepClone';

describe('handling cloning of objects and arrays', () => {
  const emptyObj = {};

  const singleLevelObj = {
    key1: 'value',
    key2: 2,
  };

  const multiLevelObj = {
    key1: {
      key2: 'value',
      key3: {
        key4: {
          key5: 'value',
        },
      },
    },
    key6: 'value',
  };

  const emptyArr: never[] = [];

  const arrOfSingleLevelObjs = [
    singleLevelObj,
    singleLevelObj,
  ];

  const arrOfMultiLevelObjs = [
    multiLevelObj,
    multiLevelObj,
  ];

  it('clones an empty object', () => {
    expect(deepClone(emptyObj)).not.toBe(emptyObj);
  });

  it('clones a single level object', () => {
    expect(deepClone(singleLevelObj)).not.toBe(
      singleLevelObj,
    );
  });

  it('clones a multi level object', () => {
    expect(deepClone(multiLevelObj)).not.toBe(
      multiLevelObj,
    );
  });

  it('clones an empty array', () => {
    expect(deepClone(emptyArr)).not.toBe(emptyArr);
  });

  it('clones an array of single level objects', () => {
    expect(deepClone(arrOfSingleLevelObjs)).not.toBe(
      arrOfSingleLevelObjs,
    );
  });

  it('clones an array of multi level objects', () => {
    expect(deepClone(arrOfMultiLevelObjs)).not.toBe(
      arrOfMultiLevelObjs,
    );
  });
});

describe('error handling', () => {
  it('throws an error if item passed is undefined', () => {
    expect(() => {
      deepClone(undefined);
    }).toThrow();
  });
});
