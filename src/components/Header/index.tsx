import React from 'react';
import PopularCoins from '../PopularCoins';
import Button from '../UI/Button';
import styles from './Header.module.scss';
import Modal from '../Modal';
import { useAppDispatch } from '../../hooks';
import { enableModal } from '../../store/slices/bagSlice';

export default function Header() {
  const dispatch = useAppDispatch();

  const chechTheBagHandle = () => {
    dispatch(enableModal('check-bag'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <PopularCoins />

        <Button onClick={chechTheBagHandle}>Open the bag</Button>

        <Modal />
      </div>
    </header>
  );
}
