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
      response = await fetch(correctURL);
    } else {
      response = await fetch(correctURL, { method, body, headers });
    }

    const status = `${response.status} ${response.ok ? 'OK' : 'HTTP error!'}`;

    let responseBody = '';
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const json: unknown = await response.json();
      responseBody = JSON.stringify(json);
    }
    return { body: responseBody, status, error: '' };
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return { body: '', status: '500 HTTP error!', error };
  }
}
