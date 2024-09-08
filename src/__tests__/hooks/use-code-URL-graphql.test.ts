import { assert, describe, test, vi } from 'vitest';

import { useEncodeURLgraphql } from '@/hooks/use-code-URL-graphql';

import { msg } from '../test-utils/msg';
import {
  correstResult,
  testEndpointURL,
  testHeaders,
  testQuery,
  testVariables,
} from './data/use-code-URL-graphql-data';

vi.mock('next/navigation', () => ({
  usePathname: () => '/GRAPHQL',
}));

describe('useEncodeURLgraphql', () => {
  test('must encode props into correct URL', () => {
    const encodeURL = useEncodeURLgraphql();
    const encodedURL = encodeURL({
      endpointURL: testEndpointURL,
      headers: testHeaders,
      variables: testVariables,
      query: testQuery,
    });
    assert(encodedURL === correstResult, msg(encodedURL, correstResult));
  });
});
