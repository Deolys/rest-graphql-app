import { assert, describe, test } from 'vitest';

import { isDataType, isDataTypeArr, isHTTPMethod } from '@/utils/predicates';

type Query = { data: unknown; expected: boolean };
type QueryDataType = { data: string; expected: boolean };

const queriesDataTypeArr: Query[] = [
  {
    data: '',
    expected: false,
  },
  {
    data: 12345,
    expected: false,
  },
  {
    data: true,
    expected: false,
  },
  {
    data: [
      {
        keyName: 'name',
        keyValue: 'value',
      },
    ],
    expected: false,
  },
  {
    data: [
      {
        key: 0,
        keyName: 'name',
        keyValue: 'value',
      },
    ],
    expected: true,
  },
  {
    data: [
      {
        key: 'key',
        keyName: 'name',
        keyValue: 'value',
      },
    ],
    expected: true,
  },
];
const queriesTTPMethod: Query[] = [
  {
    data: '',
    expected: false,
  },
  {
    data: 12345,
    expected: false,
  },
  {
    data: true,
    expected: false,
  },
  {
    data: 'GET',
    expected: true,
  },
  {
    data: 'GOT',
    expected: false,
  },
  {
    data: 'POST',
    expected: true,
  },
  {
    data: 'P0ST',
    expected: false,
  },
  {
    data: 'PUT',
    expected: true,
  },
  {
    data: 'POOT',
    expected: false,
  },
  {
    data: 'PATCH',
    expected: true,
  },
  {
    data: 'PUTCH',
    expected: false,
  },
  {
    data: 'DELETE',
    expected: true,
  },
  {
    data: 'DELET',
    expected: false,
  },
  {
    data: 'HEAD',
    expected: true,
  },
  {
    data: 'HED',
    expected: false,
  },
  {
    data: 'OPTIONS',
    expected: true,
  },
  {
    data: 'OPTIONSE',
    expected: false,
  },
];
const queriesDataType: QueryDataType[] = [
  {
    data: '',
    expected: false,
  },
  {
    data: '12345',
    expected: false,
  },
  {
    data: 'true',
    expected: false,
  },
  {
    data: '{"keyName": "name","keyValue": "value"}',
    expected: false,
  },
  {
    data: '{"key": "002", "keyName": "name2","keyValue": "value2"}',
    expected: false,
  },
  {
    data: '[{"key": "002", "keyName": "name2","keyValue": "value2"}]',
    expected: true,
  },
  {
    data: '[{"key": 33, "keyName": "name3","keyValue": "value3"}]',
    expected: true,
  },
];

function msg(data: unknown, expected: boolean, result: boolean): string {
  let dataStr = '';
  try {
    dataStr = JSON.stringify(data);
  } catch (error) {
    dataStr = data as string;
  }
  return `\ndata      : ${dataStr}\nexpected  : ${expected}\nreceived  : ${result}`;
}

describe('predicates', () => {
  test('isDataTypeArr must return correct value', () => {
    queriesDataTypeArr.forEach(({ data, expected }) => {
      const result = isDataTypeArr(data);
      assert(result === expected, msg(data, expected, result));
    });
  });
  test('isHTTPMethod must return correct value', () => {
    queriesTTPMethod.forEach(({ data, expected }) => {
      const result = isHTTPMethod(data);
      assert(result === expected, msg(data, expected, result));
    });
  });
  test('isDataType must return correct value', () => {
    queriesDataType.forEach(({ data, expected }) => {
      const result = isDataType(data);
      assert(result === expected, msg(data, expected, result));
    });
  });
});
