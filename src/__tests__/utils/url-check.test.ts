import { assert, describe, test } from 'vitest';

import { urlCheck } from '@/utils/url-check';

type Queries = { url: string; expected: string };

const badURLs: Queries[] = [
  {
    url: '',
    expected: 'Invalid URL: https://',
  },
  {
    url: '!@',
    expected: 'Invalid URL: https://!@',
  },
];
const goodURLs: Queries[] = [
  {
    url: 'example',
    expected: 'https://example/',
  },
  {
    url: 'https://example.com/graphql/JTdCJTdCa2V5MSUzQXZhbDElN0QlN0Q=?search=test',
    expected:
      'https://example.com/graphql/JTdCJTdCa2V5MSUzQXZhbDElN0QlN0Q=?search=test',
  },
];

function msg(expected: URL | string, result: URL | string): string {
  return 'expected: "' + expected + '".\n But got: "' + result + '"';
}

describe('urlCheck', () => {
  test('bad url: must return error', () => {
    badURLs.forEach(({ url, expected }) => {
      try {
        const result = urlCheck(url);
        assert(result.href === expected, msg(expected, result));
      } catch (error) {
        const e = error as Error;
        assert(e.message === expected, msg(expected, e.message));
      }
    });
  });
  test('good url: must return new URL', () => {
    goodURLs.forEach(({ url, expected }) => {
      try {
        const result = urlCheck(url);
        assert(result.href === expected, msg(expected, result));
      } catch (error) {
        const e = error as Error;
        assert(e.message === '', msg('', e.message));
      }
    });
  });
});
