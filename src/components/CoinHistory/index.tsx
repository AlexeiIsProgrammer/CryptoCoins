import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Line } from '@ant-design/charts';
import coinsAPI from '../../services/CoinsService';

import styles from './CoinHistory.module.scss';
import { IntervalParam } from '../../services/CoinsService/types/types';
import PeriodChecker from '../PeriodChecker';

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

  const arrToChartData = () =>
    fetchData?.data.map((el) => ({
      ...el,
      date: el.date
        .split('T')
        .map((dateEl, ind) => (ind === 1 ? dateEl.split('.')[0] : dateEl))
        .join(' '),
      priceUsd: +(+el.priceUsd).toFixed(10),
    }));

  useEffect(() => {
    if (fetchData?.data.length !== 0) {
      const sortedArray = arrToChartData()?.sort(
        (a, b) => +a.priceUsd - +b.priceUsd
      );
      if (sortedArray) {
        setConstOptions({
          min: +sortedArray[0].priceUsd,
          max: +sortedArray[sortedArray.length - 1].priceUsd,
        });
      }
    }
  }, [fetchData]);

  if (fetchData?.data.length === 0) {
    return <h1>No some data info about this coin...</h1>;
  }

  const config = {
    data: arrToChartData() || [],
    padding: 'auto',
    smooth: true,
    xField: 'date',
    yField: 'priceUsd',
    lineStyle: {
      stroke: '#000',
    },
    yAxis: {
      min: constOptions.min,
      max: constOptions.max,
    },
    xAxis: {
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
          <PeriodChecker selected={selected} setSelected={setSelected} />
          <div className={styles.diagram__diagram}>
            <Line {...config} />
          </div>
        </div>
      );
      break;
  }

  return <div>{content}</div>;
}
