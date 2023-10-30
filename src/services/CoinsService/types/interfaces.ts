import { HistoryType } from './types';

export interface ICoin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface ICoins {
  data: ICoin[];
  timestamp: number;
}
export interface ICoinResponse {
  data: ICoin;
  timestamp: number;
}

export interface ICoinHistoryResponse {
  data: HistoryType[];
  timestamp: number;
}
