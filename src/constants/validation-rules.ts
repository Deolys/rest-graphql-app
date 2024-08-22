export const atLeastEightCharactersRegExp = /.{8,}/;
export const uppercaseLetterRegExp = /\p{Lu}/u;
export const lowercaseLetterRegExp = /\p{Ll}/u;
export const digitRegExp = /\d/;
export const specialCharacterRegExp = /[^\p{L}\p{N}\s]/u;

export const strengthRules = [
  { regex: atLeastEightCharactersRegExp, points: 20 },
  { regex: uppercaseLetterRegExp, points: 20 },
  { regex: lowercaseLetterRegExp, points: 20 },
  { regex: specialCharacterRegExp, points: 20 },
  { regex: digitRegExp, points: 20 },
];

export const signUpPasswordRules = [
  {
    pattern: atLeastEightCharactersRegExp,
    message: 'passwordLength',
  },
  {
    pattern: uppercaseLetterRegExp,
    message: 'passwordUppercase',
  },
  {
    pattern: lowercaseLetterRegExp,
    message: 'passwordLowercase',
  },
  {
    pattern: digitRegExp,
    message: 'passwordDigit',
  },
  {
    pattern: specialCharacterRegExp,
    message: 'passwordSpecialCharacter',
  },
];
