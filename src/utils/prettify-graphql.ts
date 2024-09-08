import type { Token } from 'graphql';
import { parse } from 'graphql';

let isLine = false;

function getValue(value: string): string | undefined {
  const tokens: { [index: string]: string } = {
    '@': '@',
    '=': '= ',
    $: '$',
  };
  if (!value) return undefined;
  return tokens[value] || `${value} `;
}

function pretiefy(token: Token | null | undefined, str = '', lvl = 0): string {
  if (!token?.next) return str;

  let newStr = str;
  let newLvl = lvl;
  const openSpaces =
    lvl &&
    token.prev?.kind !== '(' &&
    token.prev?.kind !== ':' &&
    token.prev?.kind !== '$' &&
    token.prev?.kind !== '@' &&
    token.prev?.kind !== '=' &&
    token.prev?.kind !== '...'
      ? '  '.repeat(lvl)
      : '';
  const closeSpaces = lvl - 1 > 0 ? '  '.repeat(lvl - 1) : '';
  const marker = '';
  const eol =
    token.next.kind === 'Name' || token.next.kind === '...'
      ? marker + '\n'
      : '';

  switch (token.kind) {
    case 'Comment':
      newStr = `${str}${marker}\n${openSpaces}#${token.value}${marker}\n`;
      break;
    case '{':
      isLine = false;
      newStr = `${str}{${marker}\n`;
      newLvl++;
      break;
    case '}':
      isLine = false;
      newStr = `${str}${marker}\n${closeSpaces}}${eol}`;
      newLvl--;
      break;
    case '(':
      newStr = `${str.trim()}(`;
      break;
    case ')':
      newStr = `${str.trim()}) `;
      break;
    case ':':
      newStr = `${str.trim()}: `;
      break;
    case '!':
      newStr = `${str.trim()}! `;
      break;
    case 'String':
      newStr = `${str}"${token.value}"${eol}`;
      break;
    case '...':
      isLine = true;
      newStr = `${str}${openSpaces}...`;
      break;
    case 'Name':
      if (
        token.value === 'fragment' ||
        token.value === 'query' ||
        token.value === 'mutation'
      )
        isLine = true;
      newStr = isLine
        ? `${str}${getValue(token.value)}`
        : `${str}${openSpaces}${getValue(token.value)}${eol}`;
      break;
    default:
      newStr = `${str}${getValue(token.value) || getValue(token.kind) || token.kind}`;
      break;
  }

  return pretiefy(token.next, newStr, newLvl);
}

export function prettifyGraphQL(data: string): string | Error {
  if (!data) return '';
  let result = '';

  try {
    const replacedVarsData = data.replace(
      /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
      '__TEMP_VAR_$1__',
    );
    const parsedQuery = parse(replacedVarsData);
    result = pretiefy(parsedQuery.loc?.startToken.next);
    return result.trim().replace(/__TEMP_VAR_(\w+)__/g, '{{$1}}');
  } catch (error) {
    if (error instanceof Error) {
      return new Error(error.message);
    }
    return new SyntaxError('Syntax error');
  }
}
