import { usePathname } from 'next/navigation';

import type { HTTPMethod } from '@/types/client';

import { base64 } from '../utils/base64';

type Props = {
  method: HTTPMethod;
  urlData?: string;
  variables?: string;
  body?: string;
  headers: HeadersInit;
};

type EncodeURL = ({
  method,
  urlData,
  headers,
  body,
  variables,
}: Props) => string;

export function useEncodeURL(): EncodeURL {
  const pathName = usePathname();
  const [, baseSegment] = pathName.split('/');

  function encodeURL({
    method,
    urlData,
    variables,
    body,
    headers,
  }: Props): string {
    let urlBase64 = '';
    if (urlData) {
      const urlObj = JSON.stringify({ url: urlData });
      urlBase64 = '/' + base64.encode(urlObj);
    }

    let varsBodyBase64 = '';
    if (variables || body) {
      const varsBodyObj = JSON.stringify({ variables, body });
      varsBodyBase64 = '/' + base64.encode(varsBodyObj);
    }

    let headersBase64 = '';
    const headersArr = Object.entries(headers);
    if (headersArr.length) {
      const tempURL = new URL('http://temp.com');
      headersArr.forEach(([key, value]) => {
        if (key && value) tempURL.searchParams.append(key, value);
      });
      headersBase64 = tempURL.searchParams.size
        ? '?' + tempURL.searchParams.toString()
        : '';
    }

    return `/${baseSegment}/${method}${urlBase64}${varsBodyBase64}${headersBase64}`;
  }

  return encodeURL;
}
