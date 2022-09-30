import { it, expect } from 'vitest';

import toTitleCase from '../toTitleCase';

it('returns a string', () => {
  expect(toTitleCase('title case')).toBeTypeOf('string');
});

it('returns string in title case', () => {
  expect(toTitleCase("i'm a non title case string :o")).toBe(
    "I'm A Non Title Case String :o",
  );
});
