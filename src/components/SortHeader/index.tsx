import { useEffect, useState } from 'react';
import { sortByQuery } from '../../utils';
import { SortType } from '../../utils/types/types';
import SortHeaderProps from './types/types';
import table__styles from '../CoinsTable/CoinsTable.module.scss';
import styles from './SortHeader.module.scss';

export default function SortHeader({
  coins,
  setFilteredCoins,
  field,
  children,
}: SortHeaderProps) {
  const [sortType, setSortType] = useState<SortType>('');
  const [sortClassName, setSortClassName] = useState(styles['sort-header_']);

  useEffect(() => {
    setFilteredCoins(
      sortByQuery(structuredClone(coins), {
        type: sortType,
        field,
      })
    );
  }, [sortType]);

  const sortHandle = () => {
    switch (sortType) {
      case 'asc':
        setSortClassName(styles['sort-header_desc']);
        setSortType('desc');
        break;

      case 'desc':
        setSortClassName(styles['sort-header_']);
        setSortType('');
        break;

      default:
        setSortClassName(styles['sort-header_asc']);
        setSortType('asc');
        break;
    }
  };

  return (
    <th
      className={[
        table__styles.cell__header,
        styles['sort-header'],
        sortClassName,
      ].join(' ')}
      onClick={sortHandle}
    >
      {children}
    </th>
  );
}
