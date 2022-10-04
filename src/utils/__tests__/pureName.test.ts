import { it, expect } from 'vitest';

import pureName from '../pureName';

it('returns a string', () => {
  expect(pureName('Mr. Arman Attarzadeh Sr.')).toBeTypeOf('string');
});

it('returns name without salutation or other titles', () => {
  expect(pureName('Arman Attarzadeh')).toBe('Arman Attarzadeh');
  expect(pureName('Mr. Arman Attarzadeh')).toBe('Arman Attarzadeh');
  expect(pureName('Arman Attarzadeh Sr.')).toBe('Arman Attarzadeh');
  expect(pureName('Mr. Arman Attarzadeh Sr.')).toBe('Arman Attarzadeh');

  expect(pureName('Mrs. Arman Attarzadeh')).toBe('Arman Attarzadeh');
  expect(pureName('Arman Attarzadeh Jr')).toBe('Arman Attarzadeh');
  expect(pureName('Mrs Arman Attarzadeh Jr.')).toBe('Arman Attarzadeh');
});
