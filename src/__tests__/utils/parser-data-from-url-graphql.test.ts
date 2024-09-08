import { assert, describe, test } from 'vitest';

import { parseDataFromURLgraphql } from '@/utils/parser-data-from-url-graphql';

import { msg } from '../test-utils/msg';
import { encodedURLData } from './data/parser-data-from-url-graphql-data';

describe('parseDataFromURL', () => {
  test('must return correct url', () => {
    encodedURLData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(
        res.endpointURL === expected.endpointURL,
        msg(expected.endpointURL, res.endpointURL),
      );
    });
  });
  test('must return correct variables', () => {
    encodedURLData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(
        JSON.stringify(res.variables) === JSON.stringify(expected.variables),
        msg(expected.variables, res.variables),
      );
    });
  });
  test('must return correct query', () => {
    encodedURLData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(res.query === expected.query, msg(expected.query, res.query));
    });
  });
  test('must return correct headers', () => {
    encodedURLData.forEach(({ pathname, searchParams, expected }) => {
      const res = parseDataFromURLgraphql(pathname, searchParams);
      assert(
        JSON.stringify(res.headers) === JSON.stringify(expected.headers),
        msg(expected.headers, res.headers),
      );
    });
  });
});
