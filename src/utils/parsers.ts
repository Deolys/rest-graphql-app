import type { ReadonlyURLSearchParams } from 'next/navigation';

import { URLSegment, initialHeader, methods } from '@/constants/client';
import type { DataType, HTTPMethod } from '@/types/client';

import { base64 } from './base64';
import { isDataType, isHTTPMethod } from './predicates';

type DataFromURL = {
  methodForm: HTTPMethod;
  urlForm: string;
};

export const parseDataFromPathname = (pathname: string): DataFromURL => {
  const segments = pathname.split('/');
  const paths = segments
    .slice(URLSegment.method)
    .map((pathEncoded) => base64.decode(pathEncoded));

  const method = segments[URLSegment.method - 1];
  const methodForm = isHTTPMethod(method) ? method : methods.get;

  const urlForm = paths.filter((path) => !isDataType(path))[0] || '';

  return { methodForm, urlForm };
};

export const parseDataFromSearchParams = (
  searchParams: ReadonlyURLSearchParams,
): DataType[] => {
  const mappedSearchParams = Array.from(searchParams.entries()).map(
    ([key, value], i) => ({
      key: `${i}`,
      keyName: key,
      keyValue: value,
    }),
  );
  return mappedSearchParams.length ? mappedSearchParams : [initialHeader];
};
