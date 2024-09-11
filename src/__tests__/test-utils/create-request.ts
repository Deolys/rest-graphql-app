import type { HTTPMethod } from '@/types/client';

import { REST_API_ROUTE } from '../test-constants/test-constants';

const obj = { key: 'value' };

export function createRequest(
  query: string,
  method: HTTPMethod = 'GET',
): Request {
  const baseUrl = new URL(`http://localhost${REST_API_ROUTE}${query}`);
  if (method === 'GET' || method === 'HEAD') return new Request(baseUrl);
  return new Request(baseUrl, { method, body: JSON.stringify(obj) });
}
