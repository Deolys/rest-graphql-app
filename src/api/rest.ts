import type { HTTPMethod } from '@/types/client';

type Props = {
  method: HTTPMethod;
  url: string;
  body: string;
  headers: HeadersInit;
};

type FetchRest = Promise<{
  body: string;
  status: number;
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
    const correctURL = new URL(url);

    if (method === 'GET' || method === 'HEAD') {
      response = await fetch(correctURL);
    } else {
      response = await fetch(correctURL, { method, body, headers });
    }

    const status = response.status;
    if (!response.ok) {
      return { body: '', status, error: '' };
    }

    const json: unknown = await response.json();
    const str = JSON.stringify(json);
    return { body: str, status, error: '' };
  } catch (e) {
    const status = 0;
    const error = e instanceof Error ? e.message : `${e}`;
    return { body: '', status, error };
  }
}
