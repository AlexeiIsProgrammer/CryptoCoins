import React from 'react';
import coinsAPI from '../../services/CoinsService';
import PopularCoin from '../PopularCoin';
import styles from './PopularCoins.module.scss';

export default function PopularCoins() {
  const { data, isLoading, error } = coinsAPI.useFetchAllCoinsQuery({
    limit: 3,
    offset: 0,
  });

  let content: JSX.Element;

  switch (true) {
    case isLoading:
      content = <h2>Data Loading...</h2>;
      break;
    case error !== undefined:
      content = <h2>Data Fetching Error :/</h2>;
      break;
    default:
      content = (
        <div className={styles['popular-coins__header']}>
          <h5 className={styles['popular-coins__title']}>Top Coins</h5>
          <div className={styles['popular-coins']}>
            {data?.data.map((popularCoin) => (
              <PopularCoin key={popularCoin.id} coin={popularCoin} />
            ))}
          </div>
        </div>
      );
      break;
  }

  return <div>{content}</div>;
}
