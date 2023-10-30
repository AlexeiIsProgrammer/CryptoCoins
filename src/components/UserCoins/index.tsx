import React from 'react';
import styles from './UserCoins.module.scss';
import { useAppSelector } from '../../hooks';
import { bagSelector } from '../../store/selectors';
import BagCoin from '../BagCoin';

export default function UserCoins() {
  const { coins } = useAppSelector(bagSelector);

  return (
    <div className={styles.bag}>
      <ul className={styles.bag__list}>
        {coins.length !== 0 ? (
          coins.map((coin) => <BagCoin key={coin.id} coin={coin} />)
        ) : (
          <h1>Your bag is empty!</h1>
        )}
      </ul>
    </div>
  );
}
