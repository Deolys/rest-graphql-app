import type { NextResponse } from 'next/server';

import {
  GRAPHQL_API_ROUTE,
  HTTP_ALL,
  WRONG_API_ROUTE,
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
    query: `?url=${GRAPHQL_API_ROUTE}?url=${HTTP_ALL}`,
    expectedCode: 200,
  },
  {
    query: ``,
    expectedCode: 400,
  },
  {
    query: `?url=${GRAPHQL_API_ROUTE}`,
    expectedCode: 400,
  },
  {
    query: `?url=${WRONG_API_ROUTE}`,
    expectedCode: 404,
  },
];
