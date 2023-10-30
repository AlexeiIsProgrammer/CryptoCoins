export type FetchAllCoinsArgs = Partial<{
  limit: number;
  search: string;
  offset: number;
  ids: string;
}>;

export type FetchCoinArgs = {
  id: string;
};

export type FetchCoinHistoryArgs = FetchCoinArgs & {
  interval: IntervalParam;
};

export type HistoryType = {
  circulatingSupply: string;
  date: string;
  priceUsd: string;
  time: number;
};

export type IntervalParam =
  | 'm1'
  | 'm5'
  | 'm15'
  | 'm30'
  | 'h1'
  | 'h2'
  | 'h6'
  | 'h12'
  | 'd1';
