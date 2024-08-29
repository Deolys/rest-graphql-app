import { urlCheck } from '@/utils/url-check';

type Props = {
  endpointURL: string;
  query: string;
  headers: HeadersInit;
};

type FetchGraphReturn = Promise<{
  body: string;
  status: string;
  error: string;
}>;

export async function fetchGraph({
  endpointURL,
  headers,
  query,
}: Props): FetchGraphReturn {
  try {
    const correctURL = urlCheck(endpointURL);

    const response = await fetch(correctURL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    });

    const status = `${response.status} ${response.ok ? 'OK' : 'HTTP error!'}`;

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
