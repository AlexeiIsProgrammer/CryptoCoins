import React from 'react';
import PopularCoins from '../PopularCoins';
import Button from '../UI/Button';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <PopularCoins />

        <Button>Open the bag</Button>
      </div>
    </header>
  );
}
