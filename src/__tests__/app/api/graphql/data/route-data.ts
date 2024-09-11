import type { NextResponse } from 'next/server';

import {
  HTTP_ALL,
  REST_API_ROUTE,
} from '@/__tests__/test-constants/test-constants';
import { POST } from '@/app/api/graphql/route';
import type { HTTPMethod } from '@/types/client';

type TestApiRequests = {
  query: string;
  expectedCode: number;
};

type TestMethods = {
  methodName: HTTPMethod;
  methodApi: (request: Request) => Promise<NextResponse>;
};

export const testMethods: TestMethods[] = [
  {
    methodName: 'POST',
    methodApi: POST,
  },
];

export const testApiRequests: TestApiRequests[] = [
  {
    query: `?url=${REST_API_ROUTE}?url=${HTTP_ALL}`,
    expectedCode: 200,
  },
  {
    query: ``,
    expectedCode: 400,
  },
  {
    query: '?url=/api/rest',
    expectedCode: 400,
  },
  {
    query: '?url=/rest/api',
    expectedCode: 500,
  },
];
