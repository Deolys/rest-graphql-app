interface IRule {
  pattern?: RegExp
  message: string
}

export const rulesValidator = (rules: IRule[], value: string) => {
  if (!value) return Promise.reject()
  for (const rule of rules) {
    if (rule.pattern && !rule.pattern.test(value)) {
      return Promise.reject(rule.message)
    }
  }
  return Promise.resolve()
}
