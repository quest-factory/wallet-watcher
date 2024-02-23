export const hexToDecimals = (value: string, decimals: number = 18) =>
  parseInt(value, 16) / Math.pow(10, decimals);
