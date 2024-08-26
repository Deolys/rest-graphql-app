export function jsonFormat(stringifiedJSON: string): string {
  let formatted = stringifiedJSON;

  const templates = [
    ['{', '{\n'],
    [',', ',\n'],
  ];

  templates.forEach(([oldValue, newValue]) => {
    const regexp = new RegExp(oldValue, 'gi');
    formatted = formatted.replaceAll(regexp, newValue);
  });
  // const regexp1 = new RegExp(String.raw`{`, 'gi');
  // const regexp2 = new RegExp(String.raw`,`, 'gi');

  // formatted = stringifiedJSON.replaceAll(regexp1, '{\n');
  // formatted = stringifiedJSON.replaceAll(regexp2, ',\n');

  return formatted;
}
