import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';

type InitialState = {
  url: string;
  body: string;
  variables: string;
};

const initialState: InitialState = {
  url: 'test url',
  body: '{\n  \n}',
  variables: '{\n  \n}',
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },
  },
});

export default requestSlice.reducer;
export const selectURL = (state: RootState): string => state.request.url;
export const { setUrl, setBody, setVariables } = requestSlice.actions;
