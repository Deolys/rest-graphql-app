import { assert, describe, test } from 'vitest';

import { isDataType, isDataTypeArr, isHTTPMethod } from '@/utils/predicates';

import { msg } from '../test-utils/msg';
import {
  queriesDataType,
  queriesDataTypeArr,
  queriesHTTPMethod,
} from './data/predicates-data';

describe('predicates', () => {
  test('isDataTypeArr must return correct value', () => {
    queriesDataTypeArr.forEach(({ data, expected }) => {
      const result = isDataTypeArr(data);
      assert(result === expected, msg(expected, result));
    });
  });
  test('isHTTPMethod must return correct value', () => {
    queriesHTTPMethod.forEach(({ data, expected }) => {
      const result = isHTTPMethod(data);
      assert(result === expected, msg(expected, result));
    });
  });
  test('isDataType must return correct value', () => {
    queriesDataType.forEach(({ data, expected }) => {
      const result = isDataType(data);
      assert(result === expected, msg(expected, result));
    });
  });
});
