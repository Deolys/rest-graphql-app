import type { HTTPMethod } from '@/types/client';

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
    const newURL = url.match(/(http:\/\/|https:\/\/)/i)
      ? url
      : 'https://' + url;
    const correctURL = new URL(newURL);

    if (method === 'GET' || method === 'HEAD') {
      response = await fetch(correctURL);
    } else {
      response = await fetch(correctURL, { method, body, headers });
    }

    let status: string;
    if (response.ok) {
      status = `${response.status} OK`;
    } else {
      status = `${response.status} HTTP error!`;
    }

    let responseBody = '';
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const json: unknown = await response.json();
      responseBody = JSON.stringify(json);
    }
    return { body: responseBody, status, error: '' };
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return { body: '', status: '500 HTTP errror!', error };
  }
}
