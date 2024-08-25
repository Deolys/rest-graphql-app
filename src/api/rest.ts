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
    if (method === 'GET' || method === 'HEAD') {
      response = await fetch(url);
    } else {
      response = await fetch(url, { method, body, headers });
    }

    const status = response.status;
    const json: unknown = await response.json();
    const str = JSON.stringify(json);
    return { body: str, status, error: '' };
  } catch (error) {
    const errorMessage =
      error instanceof SyntaxError ? error.message : `${error}`;
    return { body: '', status: 404, error: errorMessage };
  }
}
