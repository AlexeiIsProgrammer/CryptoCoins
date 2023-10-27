export interface ICoin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string | null;
  priceUsd: string;
  changePercent24Hr: string | null;
  vwap24Hr: string;
}

export interface ICoins {
  data: ICoin[];
  timestamp: number;
}
