import { assert, describe, test } from 'vitest';

import { rulesValidator } from '@/utils/rules-validator';

import { rulesBadData, rulesGoodData } from './data/rules-validator-data';
import { msg } from './msg';

describe('rulesValidator', () => {
  test('good values: rule must return { success: true }', () => {
    rulesGoodData.forEach(({ rules, value, expected }) => {
      const result = rulesValidator(rules, value);
      assert(
        result.success === expected.success,
        msg(expected.success, result.success),
      );
    });
  });
  test('bad values: rule must return { success: false }', () => {
    rulesBadData.forEach(({ rules, value, expected }) => {
      const result = rulesValidator(rules, value);
      assert(
        result.success === expected.success,
        msg(expected.success, result.success),
      );
    });
  });
});
