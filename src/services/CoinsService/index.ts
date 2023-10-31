import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { REHYDRATE } from 'redux-persist';
import {
  ICoinHistoryResponse,
  ICoinResponse,
  ICoins,
} from './types/interfaces';
import {
  FetchAllCoinsArgs,
  FetchCoinArgs,
  FetchCoinHistoryArgs,
} from './types/types';

const coinsAPI = createApi({
  reducerPath: 'coinsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE && action.key === 'root') {
      return action.payload;
    }
  },
  endpoints: (build) => ({
    fetchAllCoins: build.query<ICoins, FetchAllCoinsArgs>({
      query: ({ limit = 5, search = '', offset = 1, ids = '' }) => ({
        url: '/assets',
        params: {
          limit,
          search,
          offset,
          ids,
        },
      }),
    }),
    fetchCoin: build.query<ICoinResponse, FetchCoinArgs>({
      query: ({ id }) => ({
        url: `/assets/${id}`,
      }),
    }),
    fetchCoinHistory: build.query<ICoinHistoryResponse, FetchCoinHistoryArgs>({
      query: ({ id, interval }) => ({
        url: `/assets/${id}/history`,
        params: {
          interval,
        },
      }),
    }),
  }),
});

export default coinsAPI;
