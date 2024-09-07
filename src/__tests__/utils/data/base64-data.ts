type CodeTestData = { str: string; expected: string };

export const encodeData: CodeTestData[] = [
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
export const decodeData: CodeTestData[] = [
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
