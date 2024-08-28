import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { initialState } from '@/constants/client';
import type { RootState } from '@/store/store';
import type { InitialState } from '@/types/client';
import { headersToObj } from '@/utils/headers-to-obj';
import { replaceVariables } from '@/utils/replace-variables';

const restRequestSlise = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<InitialState['url']>) => {
      state.url = action.payload;
    },
    setMethod: (state, action: PayloadAction<InitialState['method']>) => {
      state.method = action.payload;
    },
    setHeaders: (state, action: PayloadAction<InitialState['headers']>) => {
      state.headers = action.payload;
    },
    setBody: (state, action: PayloadAction<InitialState['body']>) => {
      state.body = action.payload;
    },
    setVariables: (state, action: PayloadAction<InitialState['variables']>) => {
      state.variables = action.payload;
    },
    setResponseStatus: (
      state,
      action: PayloadAction<InitialState['responseStatus']>,
    ) => {
      state.responseStatus = action.payload;
    },
    setResponseBody: (
      state,
      action: PayloadAction<InitialState['responseBody']>,
    ) => {
      state.responseBody = action.payload;
    },
  },
});

export default restRequestSlise.reducer;

export const selectMethod = (state: RootState): InitialState['method'] =>
  state.request.method;

export const selectURL = (state: RootState): InitialState['url'] =>
  state.request.url;

export const selectHeaders = (state: RootState): InitialState['headers'] =>
  state.request.headers;

export const selectBody = (state: RootState): InitialState['body'] =>
  state.request.body;

export const selectVars = (state: RootState): InitialState['variables'] =>
  state.request.variables;

export const selectisResStatus = (
  state: RootState,
): InitialState['responseStatus'] => state.request.responseStatus;

export const selectisResBody = (
  state: RootState,
): InitialState['responseBody'] => state.request.responseBody;

export const selectRequestOject = createSelector(
  [selectMethod, selectURL, selectHeaders, selectBody, selectVars],
  (method, urlData, headersData, bodyData, variables) => {
    const { data: url, error } = replaceVariables(variables, urlData);
    const { data: body } = replaceVariables(variables, bodyData);
    const headers = headersToObj(headersData);

    return {
      method,
      url,
      body,
      headers,
      variables,
      error,
    };
  },
);

export const selectFormData = createSelector(
  [selectMethod, selectURL, selectHeaders, selectBody, selectVars],
  (method, url, headersData, body, variables) => {
    const headers = headersToObj(headersData);

    return {
      method,
      url,
      body,
      headers,
      variables,
    };
  },
);

export const {
  setBody,
  setHeaders,
  setMethod,
  setUrl,
  setVariables,
  setResponseStatus,
  setResponseBody,
} = restRequestSlise.actions;
