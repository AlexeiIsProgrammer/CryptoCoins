import React, { useEffect, useState } from 'react';
import coinsAPI from '../../services/CoinsService';
import Coin from '../Coin';
import styles from './CoinsTable.module.scss';
import Pagination from '../Pagination';
import Input from '../UI/Input';
import { valueIsNull, valueIsZero } from '../../utils';
import { ICoin } from '../../services/CoinsService/types/interfaces';
import SortHeader from '../SortHeader';

export default function CoinsTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const LIMIT = 10;
  const OFFSET = page * LIMIT - LIMIT;

  const { data, isLoading, error } = coinsAPI.useFetchAllCoinsQuery({
    limit: LIMIT,
    search: searchQuery,
    offset: OFFSET,
  });

  const [coins, setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    if (data) {
      setCoins(
        data.data.filter(
          (coin) =>
            !(
              valueIsNull(coin.changePercent24Hr) ||
              valueIsNull(coin.volumeUsd24Hr) ||
              valueIsZero(coin.priceUsd)
            )
        )
      );
    }
  }, [data]);

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
            <SortHeader coins={coins} setCoins={setCoins} field="priceUsd">
              Price
            </SortHeader>
            <SortHeader coins={coins} setCoins={setCoins} field="marketCapUsd">
              MarketVol
            </SortHeader>
            <SortHeader
              coins={coins}
              setCoins={setCoins}
              field="changePercent24Hr"
            >
              24hPercent
            </SortHeader>
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
          {coins.map((coin, index) => (
            <Coin key={coin.id} index={index + OFFSET} coin={coin} />
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} />
    </>
  );
}
