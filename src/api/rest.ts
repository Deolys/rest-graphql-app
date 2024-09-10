import type { HTTPMethod } from '@/types/client';
import { urlCheck } from '@/utils/url-check';

type Props = {
  method: HTTPMethod;
  url: string;
  body: string;
  headers: HeadersInit;
};

type FetchRest = Promise<{
  body: string;
  status: string;
  error: string;
}>;

export async function fetchRest({
  method,
  url,
  headers,
  body,
}: Props): FetchRest {
  let response;

  try {
    const correctURL = urlCheck(url);

    if (method === 'GET' || method === 'HEAD') {
      response = await fetch(`/api/rest?url=${correctURL}`, {
        method,
        headers,
      });
    } else {
      response = await fetch(`/api/rest?url=${correctURL}`, {
        method,
        body: JSON.stringify({ body }),
        headers,
      });
    }

    const status = `${response.status} ${response.ok ? 'OK' : 'HTTP error!'}`;

    let responseBody = '';

    if (
      response.headers.get('Content-Type')?.includes('application/json') &&
      method !== 'HEAD'
    ) {
      const json: unknown = await response.json();
      responseBody = JSON.stringify(json);
    } else if (method === 'HEAD') {
      const headersObj: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headersObj[key] = value;
      });
      responseBody = JSON.stringify(headersObj);
    }
    return { body: responseBody, status, error: '' };
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return { body: '', status: '500 HTTP error!', error };
  }
}
