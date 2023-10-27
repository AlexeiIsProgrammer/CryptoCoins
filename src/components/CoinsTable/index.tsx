import React, { useState } from 'react';
import coinsAPI from '../../services/CoinsService';
import Coin from '../Coin';
import styles from './CoinsTable.module.scss';
import Pagination from '../Pagination';
import Input from '../UI/Input';

export default function CoinsTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const LIMIT = 10;
  const OFFSET = page * LIMIT - LIMIT;
  const {
    data: coins,
    isLoading,
    error,
  } = coinsAPI.useFetchAllCoinsQuery({
    limit: LIMIT,
    search: searchQuery,
    offset: OFFSET,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return error && <h1>Some error here...</h1>;
  }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr>
            <th className={styles.cell}>#</th>
            <th className={styles.cell}>Symb</th>
            <th className={styles.cell}>Img</th>
            <th className={styles.cell}>Price</th>
            <th className={styles.cell}>MarketVol</th>
            <th className={styles.cell}>24hPercent</th>
            <th className={styles.cell}>
              <Input
                placeholder="Search btc"
                value={searchQuery}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setSearchQuery(e.currentTarget.value);
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {coins?.data.map((coin, index) => (
            <Coin key={coin.id} index={index + OFFSET} coin={coin} />
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} />
    </>
  );
}
