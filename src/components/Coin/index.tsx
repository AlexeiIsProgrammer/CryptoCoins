import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoinProps from './types/types';
import Button from '../UI/Button';
import { cell__button } from './Coin.module.scss';
import styles from '../CoinsTable/CoinsTable.module.scss';
import { convertValueToPercent, convertValueToPrice } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { buyCoin } from '../../store/slices/bagSlice';

export default function Coin({ coin, index }: CoinProps) {
  const { id, symbol, priceUsd, marketCapUsd, changePercent24Hr } = coin;
  const dispatch = useAppDispatch();

  const logoURL = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  const [isLoaded, setIsLoaded] = useState(false);

  const buyCoinHandle = () => {
    dispatch(
      buyCoin({
        id,
        price: +priceUsd,
        count: 1,
      })
    );
  };

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setIsLoaded(false);
    };

    img.src = logoURL;
  }, [logoURL]);

  return (
    <tr className={[styles.row, styles.table__row].join(' ')}>
      <td className={styles.cell}>{index + 1}</td>
      <td className={styles.cell}>{symbol}</td>

      <td className={styles.cell}>
        <Link to={`coins/${id}`}>
          <div
            className={
              isLoaded ? styles.cell__image : styles.cell__image_unloaded
            }
          >
            {isLoaded && <img src={logoURL} width={30} height={30} alt={id} />}
            <span>{id}</span>
          </div>
        </Link>
      </td>
      <td className={styles.cell}>{convertValueToPrice(priceUsd)}</td>
      <td className={styles.cell}>{convertValueToPrice(marketCapUsd)}</td>
      <td className={styles.cell}>
        {convertValueToPercent(changePercent24Hr)}
      </td>
      <td className={[styles.cell, cell__button].join(' ')}>
        <Button onClick={buyCoinHandle}>Add</Button>
      </td>
    </tr>
  );
}
