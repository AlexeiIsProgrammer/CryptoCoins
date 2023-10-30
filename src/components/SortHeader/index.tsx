import React, { useEffect, useState } from 'react';
import { sortByQuery } from '../../utils';
import { SortType } from '../../utils/types/types';
import SortHeaderProps from './types/types';
import { cell } from '../CoinsTable/CoinsTable.module.scss';
import styles from './SorthHeader.module.scss';

export default function SortHeader({
  coins,
  setCoins,
  field,
  children,
}: SortHeaderProps) {
  const [sortType, setSortType] = useState<SortType>('');

  useEffect(() => {
    setCoins(
      sortByQuery(structuredClone(coins), {
        type: sortType,
        field,
      })
    );
  }, [sortType]);

  const sortHandle = () => {
    switch (sortType) {
      case 'asc':
        setSortType('desc');
        break;

      case 'desc':
        setSortType('');
        break;

      default:
        setSortType('asc');
        break;
    }
  };
  //   className={styles[`sort-header${sortType ? `_${sortType}` : ''}`]}

  return (
    <th className={cell} onClick={sortHandle}>
      {children}
    </th>
  );
}
