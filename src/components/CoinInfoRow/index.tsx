import React from 'react';
import CoinInfoRowProps from './types/types';
import styles from './CoinInfoRow.module.scss';

export default function CoinInfoRow({ name, value }: CoinInfoRowProps) {
  return (
    <div className={styles['coin-info']}>
      <div className={styles['coin-info__container']}>
        <p className={styles['coin-info__name']}>{name}</p>
        <p className={styles['coin-info__value']}>{value}</p>
      </div>
    </div>
  );
}
