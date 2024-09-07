import { signUpPasswordRules } from '@/constants/validation-rules';

interface IRule {
  pattern?: RegExp;
  message: string;
}
interface ValidatorResult {
  success: boolean;
  message?: string;
}
type RulesData = { rules: IRule[]; value: string; expected: ValidatorResult };

const atLeastEightCharactersRegExp = signUpPasswordRules[0];
const uppercaseLetterRegExp = signUpPasswordRules[1];
const lowercaseLetterRegExp = signUpPasswordRules[2];
const digitRegExp = signUpPasswordRules[3];
const specialCharacterRegExp = signUpPasswordRules[4];
export const rulesGoodData: RulesData[] = [
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
export const rulesBadData: RulesData[] = [
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
