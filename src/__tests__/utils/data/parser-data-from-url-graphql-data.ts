import type { ReadonlyURLSearchParams } from 'next/navigation';

import type { DataType } from '@/types/client';

type DataFromURL = {
  endpointURL: string;
  variables: string;
  query: string;
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
export const encodedURLData: EncodedURLData[] = [
  {
    pathname: '',
    searchParams,
    expected: {
      query: '',
      headers: [],
      endpointURL: '',
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
      variables:
        '{\n"baseURL": "https://swapi-graphql.netlify.app",\n"url": "/.netlify/functions/index"\n}',
    },
  },
];
