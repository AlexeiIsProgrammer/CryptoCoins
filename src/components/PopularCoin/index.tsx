import React from 'react';
import PopularCoinProps from './types/types';
import styles from './PopularCoin.module.scss';
import { convertValueToPercent, convertValueToPrice } from '../../utils';

export default function PopularCoin({ coin }: PopularCoinProps) {
  const { symbol, priceUsd, changePercent24Hr } = coin;

  return (
    <div className={styles['popular-coin']}>
      <span className={styles['popular-coin__name']}></span> {symbol}
      <span className={styles['popular-coin__price']}>
        {convertValueToPrice(priceUsd)}
      </span>
      <span className={styles['popular-coin__change']}>
        ({convertValueToPercent(changePercent24Hr)})
      </span>
    </div>
  );
}
