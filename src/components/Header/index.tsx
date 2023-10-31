import { useEffect, useState } from 'react';
import PopularCoins from '../PopularCoins';
import Button from '../UI/Button';
import styles from './Header.module.scss';
import Modal from '../Modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { enableModal } from '../../store/slices/bagSlice';
import coinsAPI from '../../services/CoinsService';
import { bagSelector, getCostOfBagSelector } from '../../store/selectors';
import {
  convertValueToPercent,
  convertValueToPrice,
  getSumOfCoins,
} from '../../utils';

export default function Header() {
  const dispatch = useAppDispatch();
  const [totalCost, setTotalCost] = useState<string>('');
  const [totalPercent, setTotalPercent] = useState<string>('');

  const { coins } = useAppSelector(bagSelector);
  const bagTotalCost = useAppSelector(getCostOfBagSelector);

  const values = coins.map((coin) => coin.id);

  const { data } = coinsAPI.useFetchAllCoinsQuery({
    ids: values.join(','),
    offset: 0,
    limit: values.length,
  });

  useEffect(() => {
    if (data?.data) {
      const difference =
        bagTotalCost -
        getSumOfCoins(
          coins.map((coin, index) => ({
            count: coin.count,
            price: +data.data[index].priceUsd,
          }))
        );

      const percent = (difference * 100) / bagTotalCost;

      setTotalPercent(convertValueToPercent(percent));
      setTotalCost(convertValueToPrice(difference));
    }
  }, [data]);

  const chechTheBagHandle = () => {
    dispatch(enableModal('check-bag'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <PopularCoins />

        <Button onClick={chechTheBagHandle}>
          Bag
          {bagTotalCost !== 0 &&
            `: ${convertValueToPrice(bagTotalCost)}USD ${
              +totalCost >= 0 ? `+${totalCost}` : totalCost
            } (${totalPercent})`}
        </Button>

        <Modal />
      </div>
    </header>
  );
}
