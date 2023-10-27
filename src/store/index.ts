import { configureStore, combineReducers } from '@reduxjs/toolkit';
import coinsAPI from '../services/CoinsService';

export const rootReducer = combineReducers({
  [coinsAPI.reducerPath]: coinsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
