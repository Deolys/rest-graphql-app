import { assert, describe, test } from 'vitest';

import type { DataType } from '@/types/client';
import { headersToObj } from '@/utils/headers-to-obj';

type Query = {
  headers: DataType[];
  expected: HeadersInit;
};

const queries: Query[] = [
  {
    headers: [],
    expected: {},
  },
  {
    headers: [{ key: '0', keyName: 'header-1', keyValue: 'value-1' }],
    expected: { 'header-1': 'value-1' },
  },
  {
    headers: [
      { key: '0', keyName: 'header-1', keyValue: 'value-1' },
      { key: '1', keyName: 'header-2', keyValue: 'value-2' },
      { key: '2', keyName: 'header-3', keyValue: 'value-3' },
    ],
    expected: {
      'header-1': 'value-1',
      'header-2': 'value-2',
      'header-3': 'value-3',
    },
  },
];

function msg(expected: string | object, result: string | object): string {
  let exp = '';
  let res = '';
  try {
    exp = JSON.stringify(expected);
  } catch (error) {
    exp = expected as string;
  }
  try {
    res = JSON.stringify(result);
  } catch (error) {
    res = result as string;
  }
  return `\nexpected  : ${exp}\nreceived  : ${res}`;
}

describe('headersToObj', () => {
  test('must return correct headers from DataType', () => {
    queries.forEach(({ headers, expected }) => {
      const res = headersToObj(headers);
      assert(
        JSON.stringify(res) === JSON.stringify(expected),
        msg(expected, res),
      );
    });
  });
});
