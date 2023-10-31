import React from 'react';
import styles from './PeroiodChecker.module.scss';
import PeriodCheckerProps from './types/types';
import { IntervalParam } from '../../services/CoinsService/types/types';

export default function PeriodChecker({
  selected,
  setSelected,
}: PeriodCheckerProps) {
  return (
    <div className={styles['period-checker']}>
      <ul className={styles['period-checker__list']}>
        <button
          className={[
            styles['period-checker__list__item'],
            selected === 'm1' ? styles.active : '',
          ].join(' ')}
          type="button"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            setSelected(e.currentTarget.value as IntervalParam);
          }}
          value="m1"
        >
          Day
        </button>
        <button
          className={[
            styles['period-checker__list__item'],
            selected === 'm15' ? styles.active : '',
          ].join(' ')}
          type="button"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            setSelected(e.currentTarget.value as IntervalParam);
          }}
          value="m15"
        >
          7 days
        </button>
        <button
          className={[
            styles['period-checker__list__item'],
            selected === 'h1' ? styles.active : '',
          ].join(' ')}
          type="button"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            setSelected(e.currentTarget.value as IntervalParam);
          }}
          value="h1"
        >
          Month
        </button>
      </ul>
    </div>
  );
}
