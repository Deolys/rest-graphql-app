type ReplaceVariables = {
  data: string;
  error: string;
};

export function replaceVariables(
  variables: string,
  sourceData: string,
): ReplaceVariables {
  if (!variables.trim()) return { data: sourceData, error: '' };

  try {
    const varsObj = JSON.parse(variables);
    const entries = Object.entries(varsObj);
    const urlWithReplacedVars = entries.reduce<string>(
      (result, [key, value]) => {
        const regexp = new RegExp(String.raw`{{${key}}}`, 'gi');
        return result.replaceAll(regexp, `${value}`);
      },
      sourceData,
    );

    return { data: urlWithReplacedVars, error: '' };
  } catch (error) {
    const e = error as SyntaxError;
    return { data: sourceData, error: e.message };
  }
}
