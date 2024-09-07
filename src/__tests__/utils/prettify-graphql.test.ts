import { assert, describe, test } from 'vitest';

import { prettifyGraphQL } from '@/utils/prettify-graphql';

import { ERR_MESSAGE, graphqlPretifyData } from './data/prettify-graphql-data';
import { msg } from './msg';

describe('prettifyGraphQL', () => {
  test('must return prettified string', () => {
    graphqlPretifyData.forEach(({ query, expected }) => {
      const result = prettifyGraphQL(query);
      assert(result === expected, msg(expected, result));
    });
  });
  test('must return an error string', () => {
    const result = prettifyGraphQL('bad query');
    assert(result.toString().includes(ERR_MESSAGE), msg(ERR_MESSAGE, result));
  });
});
