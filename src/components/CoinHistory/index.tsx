import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Line } from '@ant-design/charts';
import coinsAPI from '../../services/CoinsService';

import styles from './CoinHistory.module.scss';
import { IntervalParam } from '../../services/CoinsService/types/types';

export default function CoinHistory() {
  const { coinId } = useParams();
  const [selected, setSelected] = useState<IntervalParam>('m1');
  const [constOptions, setConstOptions] = useState<{
    max: number;
    min: number;
  }>({ min: 0, max: 100000 });

  const {
    data: fetchData,
    isLoading,
    error,
  } = coinsAPI.useFetchCoinHistoryQuery({
    id: coinId || '',
    interval: selected,
  });

  const arr = fetchData?.data.map((el) => ({
    ...el,
    priceUsd: +(+el.priceUsd).toFixed(2),
  }));

  useEffect(() => {
    const sortedArray = arr?.sort((a, b) => +a.priceUsd - +b.priceUsd);
    if (sortedArray) {
      setConstOptions({
        min: +sortedArray[0].priceUsd.toFixed(0),
        max: +sortedArray[sortedArray.length - 1].priceUsd.toFixed(0),
      });
    }
  }, [arr]);

  const config = {
    data: arr || [],
    padding: 'auto',
    smooth: true,
    xField: 'date',
    yField: 'priceUsd',
    yAxis: {
      min: constOptions.min,
      max: constOptions.max,
    },
    xAxis: {
      type: 'timeCat',
      tickCount: 10,
    },
  };

  let content: JSX.Element;

  switch (true) {
    case isLoading:
      content = <h1>Data Loading...</h1>;
      break;
    case error !== undefined:
      content = <h1>Data Fetching Error :/</h1>;
      break;
    default:
      content = (
        <div className={styles.diagram}>
          <div className={styles.diagram__select}>
            <select
              onChange={(e) => {
                setSelected(e.target.value);
              }}
              value={selected}
            >
              <option value="m1">День</option>
              <option value="m15">7 дней</option>
              <option value="h1">Месяц</option>
            </select>
          </div>
          <div className={styles.diagram__diagram}>
            <Line {...config} />
          </div>
        </div>
      );
      break;
  }

  return <div>{content}</div>;
}
