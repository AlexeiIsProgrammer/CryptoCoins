import React, { useEffect, useState } from 'react';
import { sortByQuery } from '../../utils';
import { SortType } from '../../utils/types/types';
import SortHeaderProps from './types/types';
import { cell } from '../CoinsTable/CoinsTable.module.scss';
import styles from './SortHeader.module.scss';

export default function SortHeader({
  coins,
  setCoins,
  field,
  children,
}: SortHeaderProps) {
  const [sortType, setSortType] = useState<SortType>('');
  const [sortClassName, setSortClassName] = useState('');

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
        setSortClassName(styles['sort-header_asc']);
        setSortType('desc');
        break;

      case 'desc':
        setSortClassName(styles['sort-header_desc']);
        setSortType('');
        break;

      default:
        setSortClassName(styles['sort-header_']);
        setSortType('asc');
        break;
    }
  };

  return (
    <th className={[cell, sortClassName].join(' ')} onClick={sortHandle}>
      {children}
    </th>
  );
}
