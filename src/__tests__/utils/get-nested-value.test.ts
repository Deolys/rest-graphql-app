import { assert, describe, test } from 'vitest';

import { findField, getNestedType } from '@/utils/get-nested-value';

import { queryGraphQL, queryObjects } from './data/get-nested-value-data';
import { msg } from './msg';

describe('get-nested-value', () => {
  test('findField must return correct value from object', () => {
    queryObjects.forEach(({ obj, fieldName, expected }) => {
      const result = findField(obj, fieldName);
      assert(
        JSON.stringify(result) === JSON.stringify(expected),
        msg(expected, result),
      );
    });
  });
  test('getNestedType must return correct value', () => {
    queryGraphQL.forEach(({ value, expected }) => {
      const result = getNestedType(value);
      assert(
        JSON.stringify(result) === JSON.stringify(expected),
        msg(expected, result),
      );
    });
  });
});
