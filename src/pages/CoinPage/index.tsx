import React from 'react';
import { useParams } from 'react-router-dom';
import coinsAPI from '../../services/CoinsService';
import CoinInfoImage from '../../components/CoinInfoImage';
import CoinInfoRow from '../../components/CoinInfoRow';
import CoinHistory from '../../components/CoinHistory';
import styles from './CoinPage.module.scss';

export default function CoinPage() {
  const { coinId } = useParams();

  const { data, isLoading, error } = coinsAPI.useFetchCoinQuery({
    id: coinId || '',
  });

  let content: JSX.Element;

  switch (true) {
    case isLoading:
      content = <h1>Loading...</h1>;
      break;
    case error !== undefined:
      content = <h1>Some error here...</h1>;
      break;
    case data === undefined:
      content = <h1>Crush data fetching</h1>;
      break;
    default:
      content = (
        <div>
          <div className={styles['coin-main']}>
            <CoinInfoImage
              name={data?.data.name}
              image={data?.data.symbol}
              id={data?.data.id}
            />

            <div>
              <CoinInfoRow name="rank" value={data?.data.rank} />
              <CoinInfoRow name="supply" value={data?.data.supply} />
              <CoinInfoRow name="Цена в USD" value={data?.data.priceUsd} />
              <CoinInfoRow
                name="Рыночная капитализация в USD"
                value={data?.data.marketCapUsd}
              />
              <CoinInfoRow name="maxSupply" value={data?.data.maxSupply} />
            </div>
          </div>
          <CoinHistory />
        </div>
      );
      break;
  }

  return content;
}
