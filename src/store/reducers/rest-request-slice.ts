import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { initialState } from '@/constants/client';
import { pageRoutes } from '@/constants/page-routes';
import type { RootState } from '@/store/store';
import type { InitialState } from '@/types/client';
import { headersToObj } from '@/utils/headers-to-obj';
import { replaceVariables } from '@/utils/replace-variables';

import { base64 } from '../../utils/base64';

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

export const selectEncodedURL = (state: RootState): InitialState['url'] => {
  // /RESTfull-client/POST/{endpointUrlBase64encoded}/{bodyBase64encoded}?header1=header1value&header2=header2value...
  try {
    if (!state.request.url.trim()) return '';
    const baseURL = state.request.url.match(/http/gi)
      ? new URL(state.request.url)
      : new URL('https://' + state.request.url);
    const endpointUrlBase64encoded = base64.encode(state.request.url);
    const bodyBase64encoded = state.request.body
      ? base64.encode(JSON.stringify(state.request.body))
      : state.request.body;
    state.request.headers.forEach((header) =>
      baseURL.searchParams.append(header.keyName, header.keyValue),
    );
    const encodedURL = `${pageRoutes.RESTFULL_CLIENT}/${state.request.method}/${endpointUrlBase64encoded}/${bodyBase64encoded}?${baseURL.searchParams}`;
    return encodedURL;
  } catch (error) {
    console.warn(error);
    return '';
  }
};

export const selectRequestOject = createSelector(
  [selectMethod, selectURL, selectHeaders, selectBody, selectVars],
  (method, urlData, headersData, body, varsData) => {
    const { url, error } = replaceVariables(varsData, urlData);
    const headers = headersToObj(headersData);

    return { method, url, body, headers, error };
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
