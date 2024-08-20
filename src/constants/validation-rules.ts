export const atLeasteightCharactersRegExp = /.{8,}/
export const uppercaseLetterRegExp = /\p{Lu}/u
export const lowercaseLetterRegExp = /\p{Ll}/u
export const digitRegExp = /\d/
export const specialCharacterRegExp = /[^\p{L}\p{N}\s]/u

export const signUpPasswordRules = [
  {
    pattern: atLeasteightCharactersRegExp,
    message: 'Password must contain at least 8 characters',
  },
  {
    pattern: uppercaseLetterRegExp,
    message: 'Password must contain at least one uppercase letter',
  },
  {
    pattern: lowercaseLetterRegExp,
    message: 'Password must contain at least one lowercase letter',
  },
  {
    pattern: digitRegExp,
    message: 'Password must contain at least one digit',
  },
  {
    pattern: specialCharacterRegExp,
    message: 'Password must contain at least one special character',
  },
]
