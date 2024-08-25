type ReplaceVariables = {
  url: string;
  error: string;
};

export function replaceVariables(
  variables: string,
  urlData: string,
): ReplaceVariables {
  try {
    const varsObj = JSON.parse(variables);
    const entries = Object.entries(varsObj);
    const urlWithReplacedVars = entries.reduce<string>(
      (result, [key, value]) => {
        const regexp = new RegExp(String.raw`{{${key}}}`, 'gi');
        return result.replaceAll(regexp, `${value}`);
      },
      urlData,
    );

    return { url: urlWithReplacedVars, error: '' };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { url: urlData, error: error.message };
    } else {
      return { url: urlData, error: `${error}` };
    }
  }
}
