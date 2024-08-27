import type { ReadonlyURLSearchParams } from 'next/navigation';

import { methods } from '@/constants/client';
import type { DataType, HTTPMethod } from '@/types/client';

import { base64 } from './base64';
import { isHTTPMethod } from './predicates';

type DataFromURL = {
  method: HTTPMethod;
  url: string;
  variables: string;
  body: string;
  headers: DataType[];
};

export const parseDataFromURL = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
): DataFromURL => {
  const segments = pathname.split('/');
  if (segments.length < 3)
    return { method: 'GET', url: '', variables: '', body: '', headers: [] };

  const meth = segments[2].toUpperCase();
  const base64URL = segments[3];
  const base64BodyVariables = segments[4];
  const method = isHTTPMethod(meth) ? meth : methods.get;

  const tempObj = {
    ...parseBase64Object(base64URL),
    ...parseBase64Object(base64BodyVariables),
  };
  const url = tempObj.url || '';
  const variables = tempObj.variables || '';
  const body = tempObj.body || '';

  const fakeURL = new URL(`https://x.com?${searchParams}`);
  const arrHeaders = [...fakeURL.searchParams.entries()];
  const headers = arrHeaders.map<DataType>(([key, value], i) => ({
    key: i,
    keyName: key,
    keyValue: value,
  }));

  return { method, url, variables, body, headers };
};

const parseBase64Object = (
  encodedStr: string,
): object | Record<string, string> => {
  if (!encodedStr) return {};
  try {
    const decodedStr = base64.decode(encodedStr);
    return JSON.parse(decodedStr);
  } catch (error) {
    return {};
  }
};
