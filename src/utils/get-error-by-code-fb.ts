import { AuthErrorCodes } from 'firebase/auth';

const errorMessages: Record<string, string> = {
  [AuthErrorCodes.EMAIL_EXISTS]: 'Email already in use',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: 'Invalid credentials',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
    'Too many attempts. Please, try later',
  [AuthErrorCodes.TOKEN_EXPIRED]: 'Token expired. Please, login again',
};

export function getErrorByCodeFB(code: string): string {
  return errorMessages[code] || 'Sorry, something went wrong';
}
