import { ICoin } from '../services/CoinsService/types/interfaces';
import { SortType, SortParam } from './types/types';

export const convertValueToPrice = (val: string | null) => {
  if (val === null) return '-';

  const [fullPart, floatPart] = val.split('.');

  return `$${fullPart.split('').reduce((acc, _, ind, arr) => {
    const lastEl = arr[arr.length - ind - 1];

    if ((ind + 1) % 3 === 0 && ind !== arr.length - 1) {
      return `,${lastEl}${acc}`;
    }

    return `${lastEl}${acc}`;
  }, '')}.${floatPart.length !== 0 ? floatPart.slice(0, 2) : ''}`;
};

export function convertValueToPercent(val: string | null) {
  if (val === null) return '-';

  return `${(+val).toFixed(2)}%`;
}

export function valueIsNull(val: string | null) {
  return val === null;
}

export function valueIsZero(val: string | null) {
  return val === null || +(+val).toFixed(2) === 0;
}

export function sortByQuery(coins: ICoin[], param: SortParam): ICoin[] {
  switch (param.type) {
    case 'asc':
      return coins.sort((a, b) => +a[param.field] - +b[param.field]);
    case 'desc':
      return coins.sort((a, b) => +b[param.field] - +a[param.field]);
    default:
      return coins;
  }
}
