export function prettifyJson(data: string): string {
  const formattedData = data
    .replace(/\{\s*\{\s*(\w+)\s*\}\s*\}/g, '__TEMP_VAR_$1__')
    .replace(/\s+/g, ' ')
    .replace(/{/g, '{\n')
    .replace(/(\w+)\{/g, '$1 {')
    .replace(/(}\s*,?)/g, '\n$1\n');
  const lines = formattedData.split('\n');

  let level = 0;
  const prettifiedLines = [];

  for (let line of lines) {
    if (line.length === 0) {
      continue;
    }
    line = line.replace(/,/g, ',\n' + '  '.repeat(level > 0 ? level : 0));
    prettifiedLines.push('  '.repeat(level > 0 ? level : 0) + line);
    if (line.includes('{')) {
      level++;
    } else if (line.includes('}')) {
      level--;
    }
  }
  let prettifiedToJson = prettifiedLines.join('\n');
  prettifiedToJson = prettifiedToJson
    .replace(/__TEMP_VAR_(\w+)__/g, '{{$1}}')
    .replace(/ {2}}/g, '}')
    .replace(/:/g, ': ')
    .replace(/\n(?:\s*\n)+/g, '\n');
  return prettifiedToJson;
}
