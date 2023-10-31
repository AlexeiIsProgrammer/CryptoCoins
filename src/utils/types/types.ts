export type SortType = 'asc' | 'desc' | '';

export type SortField = 'marketCapUsd' | 'changePercent24Hr' | 'priceUsd';

export type SortParam = {
  field: SortField;
  type: SortType;
};
