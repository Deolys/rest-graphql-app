import type { ReadonlyURLSearchParams } from 'next/navigation';
import { assert, describe, test } from 'vitest';

import type { DataType, HTTPMethod } from '@/types/client';
import { parseDataFromURL } from '@/utils/parser-data-from-url';

type DataFromURL = {
  method: HTTPMethod;
  url: string;
  urlSDL: string;
  variables: string | object;
  body: string;
  headers: DataType[];
};
type Query = {
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
const encodedURLs: Query[] = [
  {
    pathname: '',
    searchParams,
    expected: {
      body: '',
      headers: [],
      method: 'GET',
      url: '',
      urlSDL: '',
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
      urlSDL: '',
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
      urlSDL: '',
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
      urlSDL: 'https://example.com/api/v3/sdl',
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
      urlSDL: 'https://example.com/api/v3/sdl',
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
      urlSDL: 'https://example.com/api/v3/sdl',
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
      urlSDL: 'https://example.com/api/v3/sdl',
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
      urlSDL: 'https://example.com/api/v3/sdl',
      variables: '',
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

describe('parseDataFromURL', () => {
  test('must return correct HTTP meathod', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.method === expected.method, msg(expected.method, res.method));
    });
  });
  test('must return correct url', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.url === expected.url, msg(expected.url, res.url));
    });
  });
  test('must return correct urlSDL', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.urlSDL === expected.urlSDL, msg(expected.urlSDL, res.urlSDL));
    });
  });
  test('must return correct variables', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(
        JSON.stringify(res.variables) === JSON.stringify(expected.variables),
        msg(expected.variables, res.variables),
      );
    });
  });
  test('must return correct body', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(res.body === expected.body, msg(expected.body, res.body));
    });
  });
  test('must return correct headers', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURL(pathname, searchParams);
      assert(
        JSON.stringify(res.headers) === JSON.stringify(expected.headers),
        msg(expected.headers, res.headers),
      );
    });
  });
});
