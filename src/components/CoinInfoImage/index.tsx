import React from 'react';
import CoinInfoImageProps from './types/types';
import styles from './CoinInfoImage.module.scss';
import Button from '../UI/Button';

export default function CoinInfoImage({ name, image, id }: CoinInfoImageProps) {
  const logoURL = `https://assets.coincap.io/assets/icons/${image?.toLowerCase()}@2x.png`;

  return (
    <div className={styles['coin-image']}>
      <Button>Add</Button>
      <p className={styles['coin-image__name']}>
        {name} ({id})
      </p>
      <img className={styles['coin-image__image']} src={logoURL} alt={name} />
    </div>
  );
}
