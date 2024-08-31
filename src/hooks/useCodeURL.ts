import type { HTTPMethod } from '@/types/client';

import { base64 } from '../utils/base64';

type Props = {
  method: HTTPMethod;
  url?: string;
  variables?: string;
  body?: string;
  headers: HeadersInit;
};

type EncodeURL = ({ method, url, headers, body, variables }: Props) => string;

export function useEncodeURLRest(): EncodeURL {
  function encodeURL({
    method,
    url,
    variables,
    body,

    headers,
  }: Props): string {
    let urlBase64 = '';
    if (url) {
      const urlObj = JSON.stringify({ url });
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

    return `/${method}${urlBase64}${varsBodyBase64}${headersBase64}`;
  }

  return encodeURL;
}
