import type { DataType } from '@/types/client';

type HeadersTestData = {
  header: DataType[];
  expected: HeadersInit;
};

export const headers: HeadersTestData[] = [
  {
    header: [],
    expected: {},
  },
  {
    header: [{ key: '0', keyName: 'header-1', keyValue: 'value-1' }],
    expected: { 'header-1': 'value-1' },
  },
  {
    header: [
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
