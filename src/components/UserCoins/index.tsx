import React from 'react';
import styles from './UserCoins.module.scss';
import { useAppSelector } from '../../hooks';
import { bagSelector, getCostOfBagSelector } from '../../store/selectors';
import BagCoin from '../BagCoin';
import { convertValueToPrice } from '../../utils';

export default function UserCoins() {
  const { coins } = useAppSelector(bagSelector);
  const bagCost = useAppSelector(getCostOfBagSelector);

  return (
    <div className={styles.bag}>
      <ul className={styles.bag__list}>
        {coins.length !== 0 ? (
          coins.map((coin) => <BagCoin key={coin.id} coin={coin} />)
        ) : (
          <h1>Your bag is empty!</h1>
        )}
      </ul>

      {coins.length !== 0 && (
        <p className={styles.bag__cost}>
          Bag cost: {convertValueToPrice(bagCost.toString())}
        </p>
      )}
    </div>
  );
}
