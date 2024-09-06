import { beforeEach, describe, expect, it } from 'vitest';

import { initialStateGraphQL } from '@/constants/client';
import {
  selectEndpointURL,
  selectFormData,
  selectHeaders,
  selectQuery,
  selectRequestOject,
  selectSdlURL,
  selectVars,
  selectisResBody,
  selectisResStatus,
  setEndpointURL,
  setHeaders,
  setQuery,
  setResponseBody,
  setResponseStatus,
  setSdlURL,
  setVariables,
} from '@/store/reducers/graphql-request-slice';
import { setupStore } from '@/store/store';
import type { DataType } from '@/types/client';
import { headersToObj } from '@/utils/headers-to-obj';

const mockHeaders: DataType[] = [
  { key: '1', keyName: 'Content-Type', keyValue: 'application/json' },
];

const mockVariables = 'test';
const mockQuery = '{ query }';
const mockEndpointURL = 'https://api.example.com';
const mockSdlURL = 'https://api.example.com/schema';
const mockResponseStatus = '200';
const mockResponseBody = 'res';

const store = setupStore();

describe('graphqlRequestSlise', () => {
  beforeEach(() => {
    store.dispatch({
      type: '@@INIT',
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().graphql;
    expect(state).toEqual(initialStateGraphQL);
  });

  it('should handle setEndpointURL', () => {
    store.dispatch(setEndpointURL(mockEndpointURL));
    const state = store.getState().graphql;
    expect(state.endpointURL).toBe(mockEndpointURL);
  });

  it('should handle setSdlURL', () => {
    store.dispatch(setSdlURL(mockSdlURL));
    const state = store.getState().graphql;
    expect(state.sdlURL).toBe(mockSdlURL);
  });

  it('should handle setHeaders', () => {
    store.dispatch(setHeaders(mockHeaders));
    const state = store.getState().graphql;
    expect(state.headers).toEqual(mockHeaders);
  });

  it('should handle setQuery', () => {
    store.dispatch(setQuery(mockQuery));
    const state = store.getState().graphql;
    expect(state.query).toBe(mockQuery);
  });

  it('should handle setVariables', () => {
    store.dispatch(setVariables(mockVariables));
    const state = store.getState().graphql;
    expect(state.variables).toEqual(mockVariables);
  });

  it('should handle setResponseStatus', () => {
    store.dispatch(setResponseStatus(mockResponseStatus));
    const state = store.getState().graphql;
    expect(state.responseStatus).toBe(mockResponseStatus);
  });

  it('should handle setResponseBody', () => {
    store.dispatch(setResponseBody(mockResponseBody));
    const state = store.getState().graphql;
    expect(state.responseBody).toEqual(mockResponseBody);
  });

  it('should select endpointURL', () => {
    store.dispatch(setEndpointURL(mockEndpointURL));
    const endpointURL = selectEndpointURL(store.getState());
    expect(endpointURL).toBe(mockEndpointURL);
  });

  it('should select sdlURL', () => {
    store.dispatch(setSdlURL(mockSdlURL));
    const sdlURL = selectSdlURL(store.getState());
    expect(sdlURL).toBe(mockSdlURL);
  });

  it('should select headers', () => {
    store.dispatch(setHeaders(mockHeaders));
    const headers = selectHeaders(store.getState());
    expect(headers).toEqual(mockHeaders);
  });

  it('should select query', () => {
    store.dispatch(setQuery(mockQuery));
    const query = selectQuery(store.getState());
    expect(query).toBe(mockQuery);
  });

  it('should select variables', () => {
    store.dispatch(setVariables(mockVariables));
    const variables = selectVars(store.getState());
    expect(variables).toEqual(mockVariables);
  });

  it('should select responseStatus', () => {
    store.dispatch(setResponseStatus(mockResponseStatus));
    const responseStatus = selectisResStatus(store.getState());
    expect(responseStatus).toBe(mockResponseStatus);
  });

  it('should select responseBody', () => {
    store.dispatch(setResponseBody(mockResponseBody));
    const responseBody = selectisResBody(store.getState());
    expect(responseBody).toEqual(mockResponseBody);
  });

  it('should select requestObject', () => {
    const mockVariables = JSON.stringify({
      someKey: 'someValue',
    });

    store.dispatch(setEndpointURL(mockEndpointURL));
    store.dispatch(setSdlURL(mockSdlURL));
    store.dispatch(setHeaders(mockHeaders));
    store.dispatch(setQuery(mockQuery));
    store.dispatch(setVariables(mockVariables));

    const requestObject = selectRequestOject(store.getState());

    expect(requestObject).toEqual({
      endpointURL: mockEndpointURL,
      sdlURL: mockSdlURL,
      query: mockQuery,
      headers: headersToObj(mockHeaders),
      error: '',
    });
  });

  it('should select formData', () => {
    store.dispatch(setEndpointURL(mockEndpointURL));
    store.dispatch(setSdlURL(mockSdlURL));
    store.dispatch(setHeaders(mockHeaders));
    store.dispatch(setQuery(mockQuery));
    store.dispatch(setVariables(mockVariables));

    const formData = selectFormData(store.getState());
    expect(formData).toEqual({
      endpointURL: mockEndpointURL,
      sdlURL: mockSdlURL,
      query: mockQuery,
      headers: headersToObj(mockHeaders),
      variables: mockVariables,
    });
  });
});
