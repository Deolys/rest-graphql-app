import { assert, describe, test } from 'vitest';

import { prettifyJson } from '@/utils/prettify-json';

import { jsonPretifyData } from './data/prettify-json-data';
import { msg } from './msg';

describe('prettifyJson', () => {
  test('must return prettified string', () => {
    jsonPretifyData.forEach(({ query, expected }) => {
      const result = prettifyJson(query);
      assert(result === expected, msg(expected, result));
    });
  });
});
