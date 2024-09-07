export function msg(expected: unknown, result: unknown): string {
  const exp = JSON.stringify(expected);
  const res = JSON.stringify(result);
  return `\nexpected  : ${exp}\nreceived  : ${res}`;
}
