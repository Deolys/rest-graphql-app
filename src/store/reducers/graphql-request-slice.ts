import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { initialStateGraphQL } from '@/constants/client';
import type { RootState } from '@/store/store';
import type { InitialStateGraphQL } from '@/types/client';
import { headersToObj } from '@/utils/headers-to-obj';
import { replaceVariables } from '@/utils/replace-variables';

const graphqlRequestSlise = createSlice({
  name: 'graphql',
  initialState: initialStateGraphQL,
  reducers: {
    setEndpointURL: (
      state,
      action: PayloadAction<InitialStateGraphQL['endpointURL']>,
    ) => {
      state.endpointURL = action.payload;
    },
    setSdlURL: (
      state,
      action: PayloadAction<InitialStateGraphQL['sdlURL']>,
    ) => {
      state.sdlURL = action.payload;
    },
    setHeaders: (
      state,
      action: PayloadAction<InitialStateGraphQL['headers']>,
    ) => {
      state.headers = action.payload;
    },
    setQuery: (state, action: PayloadAction<InitialStateGraphQL['query']>) => {
      state.query = action.payload;
    },
    setVariables: (
      state,
      action: PayloadAction<InitialStateGraphQL['variables']>,
    ) => {
      state.variables = action.payload;
    },
    setResponseStatus: (
      state,
      action: PayloadAction<InitialStateGraphQL['responseStatus']>,
    ) => {
      state.responseStatus = action.payload;
    },
    setResponseBody: (
      state,
      action: PayloadAction<InitialStateGraphQL['responseBody']>,
    ) => {
      state.responseBody = action.payload;
    },
  },
});

export default graphqlRequestSlise.reducer;

export const selectEndpointURL = (
  state: RootState,
): InitialStateGraphQL['endpointURL'] => state.graphql.endpointURL;

export const selectSdlURL = (state: RootState): InitialStateGraphQL['sdlURL'] =>
  state.graphql.sdlURL;

export const selectHeaders = (
  state: RootState,
): InitialStateGraphQL['headers'] => state.graphql.headers;

export const selectQuery = (state: RootState): InitialStateGraphQL['query'] =>
  state.graphql.query;

export const selectVars = (
  state: RootState,
): InitialStateGraphQL['variables'] => state.graphql.variables;

export const selectisResStatus = (
  state: RootState,
): InitialStateGraphQL['responseStatus'] => state.graphql.responseStatus;

export const selectisResBody = (
  state: RootState,
): InitialStateGraphQL['responseBody'] => state.graphql.responseBody;

export const selectRequestOject = createSelector(
  [selectEndpointURL, selectSdlURL, selectHeaders, selectQuery, selectVars],
  (endpointURLvar, sdlURLvar, headersData, queryVar, variables) => {
    const { data: endpointURL, error } = replaceVariables(
      variables,
      endpointURLvar,
    );
    const { data: sdlURL } = replaceVariables(variables, sdlURLvar);
    const { data: query } = replaceVariables(variables, queryVar);
    const headers = headersToObj(headersData);

    return {
      endpointURL,
      sdlURL,
      query,
      headers,
      error,
    };
  },
);

export const selectFormData = createSelector(
  [selectEndpointURL, selectSdlURL, selectHeaders, selectQuery, selectVars],
  (endpointURL, sdlURL, headersData, query, variables) => {
    const headers = headersToObj(headersData);

    return {
      endpointURL,
      sdlURL,
      query,
      headers,
      variables,
    };
  },
);

export const {
  setQuery,
  setHeaders,
  setEndpointURL,
  setSdlURL,
  setVariables,
  setResponseStatus,
  setResponseBody,
} = graphqlRequestSlise.actions;
