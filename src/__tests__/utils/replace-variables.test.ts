import { assert, describe, test } from 'vitest';

import { replaceVariables } from '@/utils/replace-variables';

import { msg } from '../test-utils/msg';
import { templatesData } from './data/replace-variables-data';

describe('replaceVariables', () => {
  test('The string must return without any variables, but it must have values.', () => {
    templatesData.forEach(({ str, variables, expected }) => {
      const result = replaceVariables(variables, str);
      assert(result.data === expected.data, msg(expected, result));
    });
  });
});
