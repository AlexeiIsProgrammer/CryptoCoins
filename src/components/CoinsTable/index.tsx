import React, { useEffect, useState } from 'react';
import coinsAPI from '../../services/CoinsService';
import Coin from '../Coin';
import styles from './CoinsTable.module.scss';
import Pagination from '../Pagination';
import { valueIsNull, valueIsZero } from '../../utils';
import { ICoin } from '../../services/CoinsService/types/interfaces';
import SortHeader from '../SortHeader';
import TextInput from '../UI/TextInput';

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
  const [filteredCoins, setFilteredCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    setFilteredCoins(coins);
  }, [coins]);

  useEffect(() => {
    if (data) {
      setCoins(
        data.data.filter(
          (coin) =>
            !(
              valueIsNull(coin.changePercent24Hr) ||
              valueIsZero(coin.marketCapUsd) ||
              valueIsZero(coin.priceUsd)
            )
        )
      );
    }
  }, [data]);

  let content: JSX.Element;

  switch (true) {
    case isLoading:
      content = <h1>Loading...</h1>;
      break;
    case error !== undefined:
      content = <h1>Some error here...</h1>;
      break;

    default:
      content = (
        <>
          <table className={styles.table}>
            <thead className={styles.table__header}>
              <tr>
                <th className={styles.cell__header}>#</th>
                <th className={styles.cell__header}>Symbol</th>
                <th className={styles.cell__header}>Icon</th>
                <SortHeader
                  coins={coins}
                  setFilteredCoins={setFilteredCoins}
                  field="priceUsd"
                >
                  Price in USD
                </SortHeader>
                <SortHeader
                  coins={coins}
                  setFilteredCoins={setFilteredCoins}
                  field="marketCapUsd"
                >
                  Market Volume
                </SortHeader>
                <SortHeader
                  coins={coins}
                  setFilteredCoins={setFilteredCoins}
                  field="changePercent24Hr"
                >
                  24h percent
                </SortHeader>
                <th className={styles.cell__header}>
                  <TextInput
                    placeholder="Search coins.."
                    value={searchQuery}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setSearchQuery(e.currentTarget.value);
                      setPage(1);
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody className={styles.table__body}>
              {filteredCoins.length === 0 ? (
                <tr>
                  <th colSpan={7} className={styles['cell__no-items']}>
                    No money there, Go Back
                  </th>
                </tr>
              ) : (
                filteredCoins.map((coin, index) => (
                  <Coin key={coin.id} index={index + OFFSET} coin={coin} />
                ))
              )}
            </tbody>
          </table>
          <Pagination
            page={page}
            setPage={setPage}
            itemsPerPage={filteredCoins.length}
          />
        </>
      );
      break;
  }

  return content;
}
