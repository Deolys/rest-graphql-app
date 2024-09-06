import type { ReadonlyURLSearchParams } from 'next/navigation';
import { assert, describe, test } from 'vitest';

import type { DataType } from '@/types/client';
import { parseDataFromURLgraphql } from '@/utils/parser-data-from-url-graphql';

type DataFromURL = {
  endpointURL: string;
  sdlURL: string;
  variables: string;
  query: string;
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
      query: '',
      headers: [],
      endpointURL: '',
      sdlURL: '',
      variables: '',
    },
  },
  {
    pathname:
      '/GRAPHQL/JTdCJTIyZW5kcG9pbnRVUkwlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnN3YXBpLWdyYXBocWwubmV0bGlmeS5hcHAlMkYubmV0bGlmeSUyRmZ1bmN0aW9ucyUyRmluZGV4JTIyJTJDJTIyc2RsVVJMJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZzd2FwaS1ncmFwaHFsLm5ldGxpZnkuYXBwJTJGLm5ldGxpZnklMkZmdW5jdGlvbnMlMkZpbmRleCUzRnNkbCUyMiU3RA==/JTdCJTIydmFyaWFibGVzJTIyJTNBJTIyJTdCJTVDbiU1QyUyMmJhc2VVUkwlNUMlMjIlM0ElMjAlNUMlMjJodHRwcyUzQSUyRiUyRnN3YXBpLWdyYXBocWwubmV0bGlmeS5hcHAlNUMlMjIlMkMlNUNuJTVDJTIydXJsJTVDJTIyJTNBJTIwJTVDJTIyJTJGLm5ldGxpZnklMkZmdW5jdGlvbnMlMkZpbmRleCU1QyUyMiU1Q24lN0QlMjIlMkMlMjJxdWVyeSUyMiUzQSUyMnF1ZXJ5JTIwJTdCJTVDbiUyMCUyMGFsbEZpbG1zJTIwJTdCJTVDbiUyMCUyMCUyMCUyMHRvdGFsQ291bnQlNUNuJTIwJTIwJTIwJTIwZmlsbXMlMjAlN0IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwZGlyZWN0b3IlNUNuJTIwJTIwJTIwJTIwJTIwJTIwZWRpdGVkJTVDbiUyMCUyMCUyMCUyMCUyMCUyMHJlbGVhc2VEYXRlJTVDbiUyMCUyMCUyMCUyMCUyMCUyMHRpdGxlJTVDbiUyMCUyMCUyMCUyMCU3RCU1Q24lMjAlMjAlN0QlNUNuJTdEJTIyJTdE',
    searchParams,
    expected: {
      query:
        'query {\n  allFilms {\n    totalCount\n    films {\n      director\n      edited\n      releaseDate\n      title\n    }\n  }\n}',
      headers,
      endpointURL: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      sdlURL: 'https://swapi-graphql.netlify.app/.netlify/functions/index?sdl',
      variables:
        '{\n"baseURL": "https://swapi-graphql.netlify.app",\n"url": "/.netlify/functions/index"\n}',
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
  test('must return correct url', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(
        res.endpointURL === expected.endpointURL,
        msg(expected.endpointURL, res.endpointURL),
      );
    });
  });
  test('must return correct urlSDL', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(res.sdlURL === expected.sdlURL, msg(expected.sdlURL, res.sdlURL));
    });
  });
  test('must return correct variables', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(
        JSON.stringify(res.variables) === JSON.stringify(expected.variables),
        msg(expected.variables, res.variables),
      );
    });
  });
  test('must return correct query', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(res.query === expected.query, msg(expected.query, res.query));
    });
  });
  test('must return correct headers', () => {
    encodedURLs.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(
        JSON.stringify(res.headers) === JSON.stringify(expected.headers),
        msg(expected.headers, res.headers),
      );
    });
  });
});
