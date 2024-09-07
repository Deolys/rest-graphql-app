import { assert, describe, test } from 'vitest';

import { urlCheck } from '@/utils/url-check';

import { msg } from '../test-utils/msg';
import { badURLData, goodURLData } from './data/url-check-data';

describe('urlCheck', () => {
  test('bad url: must return error', () => {
    badURLData.forEach(({ url, expected }) => {
      try {
        const result = urlCheck(url);
        assert(result.href === expected, msg(expected, result));
      } catch (error) {
        const e = error as Error;
        assert(e.message === expected, msg(expected, e.message));
      }
    });
  });
  test('good url: must return new URL', () => {
    goodURLData.forEach(({ url, expected }) => {
      try {
        const result = urlCheck(url);
        assert(result.href === expected, msg(expected, result));
      } catch (error) {
        const e = error as Error;
        assert(e.message === '', msg('', e.message));
      }
    });
  });
});
