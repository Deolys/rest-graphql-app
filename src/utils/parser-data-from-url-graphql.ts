import type { ReadonlyURLSearchParams } from 'next/navigation';

import type { DataType } from '@/types/client';

import { parseBase64Object } from './parse-base64-object';

type DataFromURL = {
  endpointURL: string;
  sdlURL: string;
  variables: string;
  query: string;
  headers: DataType[];
};

export const parseDataFromURLgraphql = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
): DataFromURL => {
  const segments = pathname.split('/');
  if (segments.length < 2)
    return {
      endpointURL: '',
      sdlURL: '',
      variables: '',
      query: '',
      headers: [],
    };

  const base64URLs = segments[2];
  const base64QueryAndVariables = segments[3];

  const tempObj = {
    ...parseBase64Object(base64URLs),
    ...parseBase64Object(base64QueryAndVariables),
  };
  const endpointURL = tempObj.endpointURL || '';
  const sdlURL = tempObj.sdlURL || '';
  const variables = tempObj.variables || '';
  const query = tempObj.query || '';

  const fakeURL = new URL(`https://x.com?${searchParams}`);
  const arrHeaders = [...fakeURL.searchParams.entries()];
  const headers = arrHeaders.map<DataType>(([key, value], i) => ({
    key: i,
    keyName: key,
    keyValue: value,
  }));

  return { endpointURL, sdlURL, variables, query, headers };
};
