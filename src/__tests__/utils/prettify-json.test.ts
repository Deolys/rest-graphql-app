import { assert, describe, test } from 'vitest';

import { prettifyJson } from '@/utils/prettify-json';

type Query = { query: string; expected: string };

const queries: Query[] = [
  {
    query: '',
    expected: '',
  },
  {
    query: '{key:value}',
    expected: `{\n  key: value\n}`,
  },
  {
    query: '{key1:value1,key2:value2}',
    expected: `{\n  key1: value1,\n  key2: value2\n}`,
  },
  {
    query: '{"key1":"value1","obj":{"key2":"value2","key3":"value3"}}',
    expected: `{\n  "key1": "value1",\n  "obj": {\n    "key2": "value2",\n    "key3": "value3"\n  }\n}`,
  },
];

function msg(expected: string, result: string | Error): string {
  return 'expected: \n"' + expected + '".\n But got:\n"' + result + '"';
}

describe('prettifyJson', () => {
  test('must return prettified string', () => {
    queries.forEach(({ query, expected }) => {
      const result = prettifyJson(query);
      assert(result === expected, msg(expected, result));
    });
  });
});
