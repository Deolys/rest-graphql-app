import { describe, expect, test } from 'vitest';

import { createRequest } from '@/__tests__/test-utils/create-request';

import { testApiRequests, testMethods } from './data/route-data';

describe('test route rest/api', () => {
  testMethods.forEach(({ methodName, methodApi }) => {
    testApiRequests.forEach(({ query, expectedCode }) => {
      test(`${methodName}, ${expectedCode}`, async () => {
        const request = createRequest(query, methodName);

        const response = await methodApi(request);
        expect(response.status).toBe(expectedCode);
      });
    });
  });
});
