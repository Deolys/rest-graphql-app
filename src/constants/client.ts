import type { DataType } from '@/types/client';

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
};

export const clientMenu = [
  { label: 'Params', key: 'params' },
  { label: 'Headers', key: 'headers' },
  { label: 'Body', key: 'body' },
];

export const initialParams: DataType = {
  key: 0,
  keyName: '',
  keyValue: '',
};
