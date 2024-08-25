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

  if (method === 'GET' || method === 'HEAD') {
    response = await fetch(url);
  } else {
    response = await fetch(url, { method, body, headers });
  }

  const status = response.status;

  try {
    const json: unknown = await response.json();
    const body = JSON.stringify(json);
    return { body, status, error: '' };
  } catch (error) {
    const errorMessage =
      error instanceof SyntaxError ? error.message : `${error}`;
    return { body: '', status, error: errorMessage };
  }
}
