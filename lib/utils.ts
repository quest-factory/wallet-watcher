export const hexToDecimals = (value: string, decimals: number = 18) =>
  parseInt(value, 16) / Math.pow(10, decimals);

export const getCurrencyValue = (v: number) =>
  v < 0.1 ? `$${v}` : `$${new Intl.NumberFormat('en-US').format(v)}`;

export const strWeiToStrEth = (strWei: string) => {
  const length = strWei.length;
  if (length >= 19) {
    const firstPart = strWei.slice(0, length - 18);
    const secondPart = strWei.slice(length - 18);
    const result = `${firstPart},${secondPart}`;
    return result;
  } else {
    return strWei;
  }
};

export const reduceWalletAddress = (address: string) => {
  if (address.length > 10) {
    const firstPart = address.slice(0, 6);
    const lastPart = address.slice(-4);
    const result = `${firstPart} - ${lastPart}`;
    return result;
  } else {
    return address;
  }
};

export const timeStampToDate = (timeStamp: string) => {
  const dateFormat = new Date(parseInt(timeStamp) * 1000);

  const day = dateFormat.getDate().toString().padStart(2, '0');
  const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
  const year = dateFormat.getFullYear();

  const dateString = `${day}/${month}/${year}`;

  return dateString;
};
