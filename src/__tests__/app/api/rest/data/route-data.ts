import type { NextResponse } from 'next/server';

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
    query: `?url=https://test.com?status=200`,
    expectedCode: 200,
  },
  {
    query: `?url=https://test.com?status=400`,
    expectedCode: 400,
  },
  {
    query: `?url=https://test.com?status=500`,
    expectedCode: 500,
  },
];
