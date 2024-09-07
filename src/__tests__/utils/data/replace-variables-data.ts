type ReplaceVariables = {
  data: string;
  error: string;
};
type TemplatesData = {
  str: string;
  variables: string;
  expected: ReplaceVariables;
};

export const templatesData: TemplatesData[] = [
  {
    str: '',
    variables: '',
    expected: { data: '', error: '' },
  },
  {
    str: '    ---      ',
    variables: '',
    expected: { data: '    ---      ', error: '' },
  },
  {
    str: '',
    variables: '{var:value}',
    expected: { data: '', error: '' },
  },
  {
    str: 'qwerty asdfgh zxcvvb',
    variables: '{var:value}',
    expected: { data: 'qwerty asdfgh zxcvvb', error: '' },
  },
  {
    str: 'qwerty {{var}} zxcvvb',
    variables: '{"var":"value"}',
    expected: { data: 'qwerty value zxcvvb', error: '' },
  },
  {
    str: 'qwerty {{var1}} {{var2}} zxcvvb {{var3}}',
    variables: '{"var1":"value1","var2":"value2","var3":"value3"}',
    expected: { data: 'qwerty value1 value2 zxcvvb value3', error: '' },
  },
  {
    str: '{{base}}{{path}}{{search}}',
    variables:
      '{"base":"http://example.com","path":"/api/v2","search":"?search=bozon"}',
    expected: { data: 'http://example.com/api/v2?search=bozon', error: '' },
  },
];
