type Query = { data: unknown; expected: boolean };
type QueryDataType = { data: string; expected: boolean };

export const queriesDataTypeArr: Query[] = [
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
export const queriesHTTPMethod: Query[] = [
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
export const queriesDataType: QueryDataType[] = [
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
