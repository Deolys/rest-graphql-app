import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';

type InitialState = {
  url: string;
};

const initialState: InitialState = {
  url: 'test url',
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export default requestSlice.reducer;
export const selectURL = (state: RootState): string => state.request.url;
export const { setUrl } = requestSlice.actions;
