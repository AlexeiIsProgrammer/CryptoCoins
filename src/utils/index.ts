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
