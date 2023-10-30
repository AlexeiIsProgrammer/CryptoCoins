import React from 'react';
import BagCoinProps from './types/types';
import styles from './BagCoin.module.scss';
import Button from '../UI/Button';
import { useAppDispatch } from '../../hooks';
import { removeCoin } from '../../store/slices/bagSlice';

export default function BagCoin({ coin }: BagCoinProps) {
  const { price, id, count } = coin;
  const dispatch = useAppDispatch();

  const removeCoinHandle = () => {
    dispatch(removeCoin(id));
  };

  return (
    <div className={styles['bag-coin']}>
      <span className={styles['bag-coin__name']}>{id}</span>
      <span className={styles['bag-coin__price']}>{price}</span>
      <span className={styles['bag-coin__count']}>x{count}</span>
      <Button onClick={removeCoinHandle}>Remove coin</Button>
    </div>
  );
}
