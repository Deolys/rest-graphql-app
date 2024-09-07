type JsonPretifyData = { query: string; expected: string };

export const jsonPretifyData: JsonPretifyData[] = [
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
