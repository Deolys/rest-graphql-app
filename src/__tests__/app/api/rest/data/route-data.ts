import type { NextResponse } from 'next/server';

import {
  HTTP_ALL,
  REST_API_ROUTE,
} from '@/__tests__/test-constants/test-constants';
import {
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  POST,
  PUT,
} from '@/app/api/rest/route';
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
    methodName: 'GET',
    methodApi: GET,
  },
  {
    methodName: 'POST',
    methodApi: POST,
  },
  {
    methodName: 'PUT',
    methodApi: PUT,
  },
  {
    methodName: 'DELETE',
    methodApi: DELETE,
  },
  {
    methodName: 'PATCH',
    methodApi: PATCH,
  },
  {
    methodName: 'HEAD',
    methodApi: HEAD,
  },
  {
    methodName: 'OPTIONS',
    methodApi: OPTIONS,
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
