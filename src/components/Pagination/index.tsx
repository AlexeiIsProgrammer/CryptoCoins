import React from 'react';
import Button from '../UI/Button';
import PaginationProps from './types/types';
import styles from './Pagination.module.scss';

export default function Pagination({ page, setPage }: PaginationProps) {
  const decrementPageHandle = () => {
    setPage(page - 1);
  };

  const incrementPageHandle = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.pagination}>
      <Button onClick={decrementPageHandle} disabled={page <= 1}>
        Prev
      </Button>
      <p className={styles.pagination__page}>{page}</p>
      <Button onClick={incrementPageHandle}>Next</Button>
    </div>
  );
}
