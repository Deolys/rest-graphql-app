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
    setFormInited: (
      state,
      action: PayloadAction<InitialState['isFormInited']>,
    ) => {
      state.isFormInited = action.payload;
    },
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

export const selectisInit = (state: RootState): InitialState['isFormInited'] =>
  state.request.isFormInited;

export const selectisResStatus = (
  state: RootState,
): InitialState['responseStatus'] => state.request.responseStatus;

export const selectisResBody = (
  state: RootState,
): InitialState['responseBody'] => state.request.responseBody;

export const selectRequestOject = createSelector(
  [selectMethod, selectURL, selectHeaders, selectBody, selectVars],
  (method, urlData, headersData, bodyData, varsData) => {
    const { data: url, error } = replaceVariables(varsData, urlData);
    const { data: body } = replaceVariables(varsData, bodyData);
    const headers = headersToObj(headersData);

    return {
      method,
      url,
      urlData,
      body,
      bodyData,
      headers,
      variables: varsData,
      error,
    };
  },
);

export const {
  setBody,
  setHeaders,
  setMethod,
  setUrl,
  setFormInited,
  setVariables,
  setResponseStatus,
  setResponseBody,
} = restRequestSlise.actions;
