import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICoins } from './types/interfaces';
import { FetchAllCoinsArgs } from './types/types';

const coinsAPI = createApi({
  reducerPath: 'coinsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (build) => ({
    fetchAllCoins: build.query<ICoins, FetchAllCoinsArgs>({
      query: ({ limit = 5, search = '', offset = 1 }) => ({
        url: '/assets',
        params: {
          limit,
          search,
          offset,
        },
      }),
    }),
  }),
});

export default coinsAPI;
