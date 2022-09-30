import { it, expect } from 'vitest';

import calculateAge from '../calculateAge';

it('returns number', () => {
  expect(
    calculateAge('1990-01-01', new Date('January 01, 2022 00:00:00')),
  ).toBeTypeOf('number');
});

it('returns correct age', () => {
  const age = 32;

  expect(
    calculateAge('1990-01-01', new Date('January 01, 2022 00:00:00')),
  ).toBe(age);

  expect(
    calculateAge('1990-06-23', new Date('January 01, 2022 00:00:00')),
  ).not.toBe(age);

  expect(
    calculateAge('1990-01-01', new Date('September 29, 2022 13:52:00')),
  ).toBe(age);
});
