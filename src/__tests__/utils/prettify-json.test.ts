import { assert, describe, test } from 'vitest';

import { prettifyJson } from '@/utils/prettify-json';

import { msg } from '../test-utils/msg';
import { jsonPretifyData } from './data/prettify-json-data';

describe('prettifyJson', () => {
  test('must return prettified string', () => {
    jsonPretifyData.forEach(({ query, expected }) => {
      const result = prettifyJson(query);
      assert(result === expected, msg(expected, result));
    });
  });
});
