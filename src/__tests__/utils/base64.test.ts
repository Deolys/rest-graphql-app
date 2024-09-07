import { assert, describe, test } from 'vitest';

import { base64 } from '@/utils/base64';

import { decodeData, encodeData } from './data/base64-data';
import { msg } from './msg';

describe('base64', () => {
  test('...encode', () => {
    encodeData.forEach(({ str, expected }) => {
      const result = base64.encode(str);
      assert(result === expected, msg(expected, result));
    });
  });
  test('...decode', () => {
    decodeData.forEach(({ str, expected }) => {
      const result = base64.decode(str);
      assert(result === expected, msg(expected, result));
    });
  });
});
