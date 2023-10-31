import { Link } from 'react-router-dom';
import PopularCoinProps from './types/types';
import styles from './PopularCoin.module.scss';
import { convertValueToPercent, convertValueToPrice } from '../../utils';

export default function PopularCoin({ coin }: PopularCoinProps) {
  const { id, symbol, priceUsd, changePercent24Hr } = coin;

  return (
    <Link to={`coins/${id}`} className={styles['popular-coin']}>
      <span className={styles['popular-coin__name']}>{symbol}</span>
      <span className={styles['popular-coin__price']}>
        {convertValueToPrice(priceUsd)}
      </span>
      <span className={styles['popular-coin__change']}>
        ({convertValueToPercent(changePercent24Hr)})
      </span>
    </Link>
  );
}
