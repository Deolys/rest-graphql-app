import type { ReadonlyURLSearchParams } from 'next/navigation';

import type { DataType, HTTPMethod } from '@/types/client';

type DataFromURL = {
  method: HTTPMethod;
  url: string;
  variables: string | object;
  body: string;
  headers: DataType[];
};
type EncodedURLData = {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  expected: DataFromURL;
};

const searchParams = new URL('https://x.com?search=test&id=33')
  .searchParams as ReadonlyURLSearchParams;
const headers = [
  { key: 0, keyName: 'search', keyValue: 'test' },
  { key: 1, keyName: 'id', keyValue: '33' },
];
export const encodedURLrestData: EncodedURLData[] = [
  {
    pathname: '',
    searchParams,
    expected: {
      body: '',
      headers: [],
      method: 'GET',
      url: '',
      variables: '',
    },
  },
  {
    pathname:
      '/get/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyMiU3RA==/path2',
    searchParams,
    expected: {
      body: '',
      headers: [
        { key: 0, keyName: 'search', keyValue: 'test' },
        { key: 1, keyName: 'id', keyValue: '33' },
      ],
      method: 'GET',
      url: 'https://example.com',
      variables: '',
    },
  },
  {
    pathname:
      '/post/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRmFwaSUyRnYyJTIyJTdE/path2',
    searchParams,
    expected: {
      body: '',
      headers,
      method: 'POST',
      url: 'https://example.com/api/v2',
      variables: '',
    },
  },
  {
    pathname:
      '/put/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRmFwaSUyRnYyJTJGdGVzdCUyMiUyQyUyMCUyMnVybHNkbCUyMiUzQSUyMCUyMmh0dHBzJTNBJTJGJTJGZXhhbXBsZS5jb20lMkZhcGklMkZ2MyUyRnNkbCUyMiU3RA==/JTdCJTIydmFyaWFibGVzJTIyJTNBJTIwJTdCJTIydmFyMSUyMiUzQSUyMCUyMnZhbHVlMSUyMiU3RCU3RA==',
    searchParams,
    expected: {
      body: '',
      headers,
      method: 'PUT',
      url: 'https://example.com/api/v2/test',
      variables: { var1: 'value1' },
    },
  },
  {
    pathname:
      '/patch/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRmFwaSUyRnYyJTJGdGVzdCUyMiUyQyUyMCUyMnVybHNkbCUyMiUzQSUyMCUyMmh0dHBzJTNBJTJGJTJGZXhhbXBsZS5jb20lMkZhcGklMkZ2MyUyRnNkbCUyMiU3RA==/JTdCJTIydmFyaWFibGVzJTIyJTNBJTIwJTdCJTIydmFyMSUyMiUzQSUyMCUyMnZhbHVlMSUyMiU3RCUyQyUyMCUyMmJvZHklMjIlM0ElMjJ0ZXN0JTIwYm9keSUyMiU3RA==',
    searchParams,
    expected: {
      body: 'test body',
      headers,
      method: 'PATCH',
      url: 'https://example.com/api/v2/test',
      variables: { var1: 'value1' },
    },
  },
  {
    pathname:
      '/delete/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRmFwaSUyRnYyJTJGdGVzdCUyMiUyQyUyMCUyMnVybHNkbCUyMiUzQSUyMCUyMmh0dHBzJTNBJTJGJTJGZXhhbXBsZS5jb20lMkZhcGklMkZ2MyUyRnNkbCUyMiU3RA==/JTdCJTIydmFyaWFibGVzJTIyJTNBJTIwJTdCJTIydmFyMSUyMiUzQSUyMCUyMnZhbHVlMSUyMiUyQyUyMCUyMnZhcjIlMjIlM0ElMjJ2YWx1ZTIlMjIlN0QlMkMlMjAlMjJib2R5JTIyJTNBJTIydGl0bGUlM0RzdGFyJTIyJTdE',
    searchParams,
    expected: {
      body: 'title=star',
      headers,
      method: 'DELETE',
      url: 'https://example.com/api/v2/test',
      variables: { var1: 'value1', var2: 'value2' },
    },
  },
  {
    pathname:
      '/head/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRmFwaSUyRnYyJTJGdGVzdCUyMiUyQyUyMCUyMnVybHNkbCUyMiUzQSUyMCUyMmh0dHBzJTNBJTJGJTJGZXhhbXBsZS5jb20lMkZhcGklMkZ2MyUyRnNkbCUyMiU3RA==/JTdCJTBBJTIwJTIwdmFyaWFibGVzJTNBJTIwJTdCJTIwdmFyMSUzQSUyMCd2YWx1ZTEnJTJDJTIwdmFyMiUzQSUyMCd2YWx1ZTInJTIwJTdEJTJDJTBBJTIwJTIwYm9keSUzQSUyMCd0aXRsZSUzRHN0YXInJTJDJTBBJTdE',
    searchParams,
    expected: {
      body: '',
      headers,
      method: 'HEAD',
      url: 'https://example.com/api/v2/test',
      variables: '',
    },
  },
  {
    pathname:
      '/options/JTdCJTIydXJsJTIyJTNBJTIwJTIyaHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRmFwaSUyRnYyJTJGdGVzdCUyMiUyQyUyMCUyMnVybHNkbCUyMiUzQSUyMCUyMmh0dHBzJTNBJTJGJTJGZXhhbXBsZS5jb20lMkZhcGklMkZ2MyUyRnNkbCUyMiU3RA==/JTdCJTBBJTIwJTIwdmFyaWFibGVzJTNBJTIwJTdCJTIwdmFyMSUzQSUyMCd2YWx1ZTEnJTJDJTIwdmFyMiUzQSUyMCd2YWx1ZTInJTIwJTdEJTJDJTBBJTIwJTIwYm9keSUzQSUyMCd0aXRsZSUzRHN0YXInJTJDJTBBJTdE',
    searchParams,
    expected: {
      body: '',
      headers,
      method: 'OPTIONS',
      url: 'https://example.com/api/v2/test',
      variables: '',
    },
  },
];
