export function prettifyJson(data: string): string {
  data = data
    .replace(/\s/g, '')
    .replace(/{/g, '{\n')
    .replace(/(}\s*,?)/g, '\n$1\n');
  const lines = data.split('\n');

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
    .replace(/ {2}}/g, '}')
    .replace(/:/g, ': ')
    .replace(/\n(?:\s*\n)+/g, '\n');
  return prettifiedToJson;
}
