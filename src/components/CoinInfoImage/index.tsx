import CoinInfoImageProps from './types/types';
import styles from './CoinInfoImage.module.scss';
import Button from '../UI/Button';
import { useAppDispatch } from '../../hooks';
import { buyCoin } from '../../store/slices/bagSlice';

export default function CoinInfoImage({
  name,
  image,
  id,
  priceUsd,
}: CoinInfoImageProps) {
  const dispatch = useAppDispatch();

  const buyCoinHandle = () => {
    dispatch(
      buyCoin({
        id,
        price: +priceUsd,
        count: 1,
      })
    );
  };

  const logoURL = `https://assets.coincap.io/assets/icons/${image?.toLowerCase()}@2x.png`;

  return (
    <div className={styles['coin-image']}>
      <Button onClick={buyCoinHandle}>Add</Button>
      <p className={styles['coin-image__name']}>
        {name} ({id})
      </p>
      <img className={styles['coin-image__image']} src={logoURL} alt={name} />
    </div>
  );
}
