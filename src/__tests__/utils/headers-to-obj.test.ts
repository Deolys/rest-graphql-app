import { assert, describe, test } from 'vitest';

import { headersToObj } from '@/utils/headers-to-obj';

import { headers } from './data/headers-to-obj-data';
import { msg } from './msg';

describe('headersToObj', () => {
  test('must return correct headers from DataType', () => {
    headers.forEach(({ header, expected }) => {
      const res = headersToObj(header);
      assert(
        JSON.stringify(res) === JSON.stringify(expected),
        msg(expected, res),
      );
    });
  });
});
