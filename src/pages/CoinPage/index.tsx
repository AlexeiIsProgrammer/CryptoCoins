import React from 'react';
import { useParams } from 'react-router-dom';
import coinsAPI from '../../services/CoinsService';
import CoinInfoImage from '../../components/CoinInfoImage';
import CoinInfoRow from '../../components/CoinInfoRow';
import CoinHistory from '../../components/CoinHistory';
import styles from './CoinPage.module.scss';
import { convertValueToPrice } from '../../utils';

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
    default:
      content =
        data?.data === undefined ? (
          <h1>Crush data fetching</h1>
        ) : (
          <div>
            <div className={styles['coin-main']}>
              <CoinInfoImage
                name={data.data.name}
                image={data.data.symbol}
                id={data.data.id}
                priceUsd={data.data.priceUsd}
              />

              <div className={styles['coin-main__info']}>
                <CoinInfoRow name="Rank" value={data.data.rank} />
                <CoinInfoRow
                  name="Supply"
                  value={data.data.supply?.split('.')[0] || 'None'}
                />
                <CoinInfoRow
                  name="Price in USD"
                  value={convertValueToPrice(data.data.priceUsd)}
                />
                <CoinInfoRow
                  name="Market Capitalization in USD"
                  value={convertValueToPrice(data.data.marketCapUsd)}
                />
                <CoinInfoRow
                  name="Max Supply"
                  value={data.data.maxSupply?.split('.')[0] || 'None'}
                />
              </div>
            </div>
            <CoinHistory />
          </div>
        );

      break;
  }

  return content;
}
