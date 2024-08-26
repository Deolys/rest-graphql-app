export function prettifyJson(data: string): string {
  data = data.replace(/\s/g, '');
  data = data.replace(/{/g, '{\n');
  data = data.replace(/}/g, '\n}\n');
  const lines = data.split('\n');

  let level = 0;
  const prettifiedLines = [];

  for (let line of lines) {
    if (line.length === 0) {
      continue;
    }
    line = line.replace(/,/g, ',\n' + '  '.repeat(level));
    prettifiedLines.push('  '.repeat(level) + line);
    if (line.includes('{')) {
      level++;
    }
    if (line.includes('}')) {
      level--;
    }
  }
  let prettifiedToJson = prettifiedLines.join('\n');
  prettifiedToJson = prettifiedToJson.replace(/ {2}}/g, '}');
  prettifiedToJson = prettifiedToJson.replace(/{,/g, '{');
  prettifiedToJson = prettifiedToJson.replace(/:/g, ': ');
  return prettifiedToJson;
}
