import { it, expect } from 'vitest';

import prettyDate from '../prettyDate';

it('returns a string', () => {
  expect(prettyDate('2022-01-01')).toBeTypeOf('string');
});

it('returns a date that is correctly formatted', () => {
  expect(prettyDate('2022-01-01')).toBe('01/01/2022');
  expect(prettyDate('1977-12-23')).toBe('23/12/1977');
});
