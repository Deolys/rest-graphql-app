import type { DataType, InitialState } from '@/types/client';

export const URLSegment = {
  method: 3,
  url: 3,
  params: 4,
};

export const methods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  putch: 'PATCH',
  delete: 'DELETE',
  head: 'HEAD',
  options: 'OPTIONS',
  graphql: 'GRAPHQL',
} as const;

export const tabs = [
  { label: 'Headers', key: 'headers' },
  { label: 'Variables', key: 'variables' },
  { label: 'Body', key: 'body' },
];

export const initialData: DataType = {
  key: 0,
  keyName: '',
  keyValue: '',
};

export const initialHeader: DataType = {
  key: 0,
  keyName: 'Content-Type',
  keyValue: 'multipart/form-data',
};

export const initialBody: DataType = {
  key: 0,
  keyName: 'test body',
  keyValue: '12345',
};

export const initialState: InitialState = {
  isFormInited: false,
  method: methods.get,
  url: 'test url',
  headers: [initialHeader],
  body: [initialBody],
};
