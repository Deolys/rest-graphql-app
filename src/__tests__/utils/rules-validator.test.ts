import { assert, describe, test } from 'vitest';

import { signUpPasswordRules } from '@/constants/validation-rules';
import { rulesValidator } from '@/utils/rules-validator';

interface IRule {
  pattern?: RegExp;
  message: string;
}
interface ValidatorResult {
  success: boolean;
  message?: string;
}
type Queries = { rules: IRule[]; value: string; expected: ValidatorResult };

const atLeastEightCharactersRegExp = signUpPasswordRules[0];
const uppercaseLetterRegExp = signUpPasswordRules[1];
const lowercaseLetterRegExp = signUpPasswordRules[2];
const digitRegExp = signUpPasswordRules[3];
const specialCharacterRegExp = signUpPasswordRules[4];
const goodQueries: Queries[] = [
  {
    rules: [atLeastEightCharactersRegExp],
    value: '1234asdf',
    expected: { success: true, message: '' },
  },
  {
    rules: [atLeastEightCharactersRegExp],
    value: '123456789asZX$$',
    expected: { success: true, message: '' },
  },
  {
    rules: [uppercaseLetterRegExp],
    value: 'erty_PW_987',
    expected: { success: true, message: '' },
  },
  {
    rules: [uppercaseLetterRegExp],
    value: 'H',
    expected: { success: true, message: '' },
  },
  {
    rules: [lowercaseLetterRegExp],
    value: 'e',
    expected: { success: true, message: '' },
  },
  {
    rules: [lowercaseLetterRegExp],
    value: '12345_z_IUUY',
    expected: { success: true, message: '' },
  },
  {
    rules: [digitRegExp],
    value: 'ASDFGHJ_8_',
    expected: { success: true, message: '' },
  },
  {
    rules: [digitRegExp],
    value: '5_asdfghj@#$%',
    expected: { success: true, message: '' },
  },
  {
    rules: [specialCharacterRegExp],
    value: '@',
    expected: { success: true, message: '' },
  },
  {
    rules: [specialCharacterRegExp],
    value: 'hghghg_fgfgfg_$',
    expected: { success: true, message: '' },
  },
];
const badQueries: Queries[] = [
  {
    rules: [atLeastEightCharactersRegExp],
    value: '',
    expected: { success: false, message: '' },
  },
  {
    rules: [atLeastEightCharactersRegExp],
    value: '1234567',
    expected: { success: false, message: '' },
  },
  {
    rules: [uppercaseLetterRegExp],
    value: '1234567',
    expected: { success: false, message: '' },
  },
  {
    rules: [uppercaseLetterRegExp],
    value: 'asdfgh',
    expected: { success: false, message: '' },
  },
  {
    rules: [lowercaseLetterRegExp],
    value: 'ASDFGHJ',
    expected: { success: false, message: '' },
  },
  {
    rules: [lowercaseLetterRegExp],
    value: '12345',
    expected: { success: false, message: '' },
  },
  {
    rules: [digitRegExp],
    value: 'ASDFGHJ',
    expected: { success: false, message: '' },
  },
  {
    rules: [digitRegExp],
    value: 'asdfghj@#$%',
    expected: { success: false, message: '' },
  },
  {
    rules: [specialCharacterRegExp],
    value: '45678ASDFGHJ',
    expected: { success: false, message: '' },
  },
  {
    rules: [specialCharacterRegExp],
    value: 'asdfghj4567',
    expected: { success: false, message: '' },
  },
];

function msg(
  value: string,
  expected: boolean | string,
  result: boolean | string,
): string {
  return `\nvalue: ${value},\nexpected result: "${expected}",\nbut got result: "${result} " `;
}

describe('rulesValidator', () => {
  test('good values: rule must return { success: true }', () => {
    goodQueries.forEach(({ rules, value, expected }) => {
      const result = rulesValidator(rules, value);
      assert(
        result.success === expected.success,
        msg(value, expected.success, result.success),
      );
    });
  });
  test('bad values: rule must return { success: false }', () => {
    badQueries.forEach(({ rules, value, expected }) => {
      const result = rulesValidator(rules, value);
      assert(
        result.success === expected.success,
        msg(value, expected.success, result.success),
      );
    });
  });
});
