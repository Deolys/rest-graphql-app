import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import restRequestSlise from '@/store/reducers/rest-request-slice';

const rootReducer = combineReducers({
  request: restRequestSlise,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppStore = useStore.withTypes();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
