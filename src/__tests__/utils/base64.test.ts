import { assert, describe, test } from 'vitest';

import { base64 } from '@/utils/base64';

type Queries = { str: string; expected: string };

const encodeQueries: Queries[] = [
  {
    str: '',
    expected: '',
  },
  {
    str: '~!@#$%^&*()_+|0123456789qwertyфывапр',
    expected:
      'fiElNDAlMjMlMjQlMjUlNUUlMjYqKClfJTJCJTdDMDEyMzQ1Njc4OXF3ZXJ0eSVEMSU4NCVEMSU4QiVEMCVCMiVEMCVCMCVEMCVCRiVEMSU4MA==',
  },
  {
    str: 'http://test.com/rest/post/{key:value}/{key:value}?search=test&sort=asc',
    expected:
      'aHR0cCUzQSUyRiUyRnRlc3QuY29tJTJGcmVzdCUyRnBvc3QlMkYlN0JrZXklM0F2YWx1ZSU3RCUyRiU3QmtleSUzQXZhbHVlJTdEJTNGc2VhcmNoJTNEdGVzdCUyNnNvcnQlM0Rhc2M=',
  },
];
const decodeQueries: Queries[] = [
  {
    str: '',
    expected: '',
  },
  {
    str: 'fiElNDAlMjMlMjQlMjUlNUUlMjYqKClfJTJCJTdDMDEyMzQ1Njc4OXF3ZXJ0eSVEMSU4NCVEMSU4QiVEMCVCMiVEMCVCMCVEMCVCRiVEMSU4MA==',
    expected: '~!@#$%^&*()_+|0123456789qwertyфывапр',
  },
  {
    str: 'aHR0cCUzQSUyRiUyRnRlc3QuY29tJTJGcmVzdCUyRnBvc3QlMkYlN0JrZXklM0F2YWx1ZSU3RCUyRiU3QmtleSUzQXZhbHVlJTdEJTNGc2VhcmNoJTNEdGVzdCUyNnNvcnQlM0Rhc2M=',
    expected:
      'http://test.com/rest/post/{key:value}/{key:value}?search=test&sort=asc',
  },
  {
    str: 'bad string not coded',
    expected: 'bad string not coded',
  },
];

function msg(expected: string, result: string | Error): string {
  return 'expected: "' + expected + '".\n But got: "' + result + '"';
}

describe('base64', () => {
  test('...encode', () => {
    encodeQueries.forEach(({ str, expected }) => {
      const result = base64.encode(str);
      assert(result === expected, msg(expected, result));
    });
  });
  test('...decode', () => {
    decodeQueries.forEach(({ str, expected }) => {
      const result = base64.decode(str);
      assert(result === expected, msg(expected, result));
    });
  });
});
