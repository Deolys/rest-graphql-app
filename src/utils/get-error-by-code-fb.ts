import { AuthErrorCodes } from 'firebase/auth';

const errorMessages: Record<string, string> = {
  [AuthErrorCodes.EMAIL_EXISTS]: 'emailExists',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: 'invalidCredentials',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'tooManyAttempts',
  [AuthErrorCodes.TOKEN_EXPIRED]: 'tokenExpired',
};

export function getErrorByCodeFB(code: string): string {
  return errorMessages[code] || 'somethingWentWrong';
}
