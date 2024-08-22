interface IRule {
  pattern?: RegExp;
  message: string;
}

interface ValidatorResult {
  success: boolean;
  message?: string;
}

export function rulesValidator(rules: IRule[], value: string): ValidatorResult {
  if (!value) {
    return { success: false };
  }
  for (const rule of rules) {
    if (rule.pattern && !rule.pattern.test(value)) {
      return { success: false, message: rule.message };
    }
  }
  return { success: true };
}
