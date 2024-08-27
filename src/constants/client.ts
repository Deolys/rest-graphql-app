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

export const tabsRest = [
  { label: 'Headers', key: 'headers' },
  { label: 'Variables', key: 'variables' },
  { label: 'Body', key: 'body' },
];

export const tabsGraphQL = [
  { label: 'Headers', key: 'headers' },
  { label: 'Variables', key: 'variables' },
  { label: 'Query', key: 'query' },
];

export const initialData: DataType = {
  key: 0,
  keyName: '',
  keyValue: '',
};

export const initialHeader: DataType = {
  key: 0,
  keyName: 'Content-Type',
  keyValue: 'application/x-www-form-urlencoded',
};

export const initialState: InitialState = {
  isFormInited: false,
  method: methods.get,
  url: '{{baseURL}}{{url}}',
  headers: [initialHeader],
  body: 'title=ship',
  variables:
    '{\n"baseURL": "https://stapi.co/api",\n"url": "/v1/rest/episode/search?pageNumber=0&pageSize=2"\n}',
  responseStatus: '',
  responseBody: '',
};
