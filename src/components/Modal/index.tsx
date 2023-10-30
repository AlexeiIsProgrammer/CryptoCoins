import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Modal.module.scss';
import { bagSelector } from '../../store/selectors';
import { useAppSelector } from '../../hooks';
import BuyCoin from '../BuyCoin';
import UserCoins from '../UserCoins';
import { disableModal } from '../../store/slices/bagSlice';

export default function Modal() {
  const { modal } = useAppSelector(bagSelector);
  const dispatch = useDispatch();

  const closeModalHandle = () => {
    dispatch(disableModal());
  };

  return (
    <div className={`${styles.modal} ${modal.isOpened ? styles.active : ''}`}>
      <span onClick={closeModalHandle} className={styles.modal__close} />

      <div className={styles.modal__container}>
        <h2 className={styles.modal__title}>
          {modal.type === 'buy-coin' ? 'Buy coins' : 'Bag'}
        </h2>
        <div className={styles.modal__block}>
          {modal.type === 'buy-coin' ? <BuyCoin /> : <UserCoins />}
        </div>
      </div>
    </div>
  );
}
