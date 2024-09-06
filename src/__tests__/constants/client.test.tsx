import { describe, expect, it } from 'vitest';

import {
  URLSegment,
  initialData,
  initialHeader,
  initialHeaderGraphQL,
  initialState,
  initialStateGraphQL,
  methods,
  tabsGraphQL,
  tabsRest,
} from '@/constants/client';

describe('Constants and Initial States', () => {
  it('should have correct URLSegment values', () => {
    expect(URLSegment).toEqual({
      method: 3,
      url: 3,
      params: 4,
    });
  });

  it('should have correct methods values', () => {
    expect(methods.get).toBe('GET');
    expect(methods.post).toBe('POST');
    expect(methods.put).toBe('PUT');
    expect(methods.patch).toBe('PATCH');
    expect(methods.delete).toBe('DELETE');
    expect(methods.head).toBe('HEAD');
    expect(methods.options).toBe('OPTIONS');
  });

  it('should have correct tabs for REST API', () => {
    expect(tabsRest).toEqual([
      { label: 'Headers', key: 'headers' },
      { label: 'Variables', key: 'variables' },
      { label: 'Body', key: 'body' },
    ]);
  });

  it('should have correct tabs for GraphQL', () => {
    expect(tabsGraphQL).toEqual([
      { label: 'Headers', key: 'headers' },
      { label: 'Variables', key: 'variables' },
      { label: 'Query', key: 'query' },
    ]);
  });

  it('should have correct initial data', () => {
    expect(initialData).toEqual({
      key: 0,
      keyName: '',
      keyValue: '',
    });
  });

  it('should have correct initial header for REST API', () => {
    expect(initialHeader).toEqual({
      key: 0,
      keyName: 'Content-Type',
      keyValue: 'application/x-www-form-urlencoded',
    });
  });

  it('should have correct initial state for REST API', () => {
    expect(initialState).toEqual({
      method: methods.get,
      url: '{{baseURL}}{{url}}',
      headers: [initialHeader],
      body: 'title=ship',
      variables:
        '{\n"baseURL": "https://stapi.co/api",\n"url": "/v1/rest/episode/search?pageNumber=0&pageSize=2"\n}',
      responseStatus: '',
      responseBody: '',
    });
  });

  it('should have correct initial header for GraphQL', () => {
    expect(initialHeaderGraphQL).toEqual({
      key: 0,
      keyName: 'Content-Type',
      keyValue: 'application/json',
    });
  });

  it('should have correct initial state for GraphQL', () => {
    expect(initialStateGraphQL).toEqual({
      endpointURL: '{{baseURL}}{{url}}',
      sdlURL: '',
      headers: [initialHeaderGraphQL],
      query:
        'query {\n  allFilms {\n    totalCount\n    films {\n      title\n    }\n  }\n}',
      variables:
        '{\n"baseURL": "https://swapi-graphql.netlify.app",\n"url": "/.netlify/functions/index"\n}',
      responseStatus: '',
      responseBody: '',
    });
  });
});
