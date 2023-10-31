import { useState } from 'react';
import NumberInput from '../UI/NumberInput';
import styles from './BuyCoin.module.scss';
import Button from '../UI/Button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCoin } from '../../store/slices/bagSlice';
import { bagSelector } from '../../store/selectors';

export default function BuyCoin() {
  const { coinToBuy } = useAppSelector(bagSelector);
  const dispatch = useAppDispatch();
  const [coinValue, setCoinValue] = useState(1);

  const buyCoinHandle = () => {
    if (coinToBuy) {
      dispatch(
        addCoin({
          id: coinToBuy.id,
          price: coinToBuy.price,
          count: coinValue,
        })
      );
    }
  };

  return (
    <div className={styles['buy-coin']}>
      <NumberInput
        onChange={(e) => setCoinValue(+e.currentTarget.value)}
        value={coinValue}
        placeholder="Add some coins..."
      />
      <Button onClick={buyCoinHandle}>Buy</Button>
    </div>
  );
}
