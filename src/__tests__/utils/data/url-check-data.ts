type URLData = { url: string; expected: string };

export const badURLData: URLData[] = [
  {
    url: '',
    expected: 'Invalid URL: https://',
  },
  {
    url: '!@',
    expected: 'Invalid URL: https://!@',
  },
];
export const goodURLData: URLData[] = [
  {
    url: 'example',
    expected: 'https://example/',
  },
  {
    url: 'https://example.com/graphql/JTdCJTdCa2V5MSUzQXZhbDElN0QlN0Q=?search=test',
    expected:
      'https://example.com/graphql/JTdCJTdCa2V5MSUzQXZhbDElN0QlN0Q=?search=test',
  },
];
