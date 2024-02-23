export const hexToDecimals = (value: string, decimals: number = 18) =>
  parseInt(value, 16) / Math.pow(10, decimals);

export const getCurrencyValue = (v: number) =>
  v < 0.1 ? `$${v}` : `$${new Intl.NumberFormat('en-US').format(v)}`;
