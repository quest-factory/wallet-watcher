export const hexToDecimals = (value: string, decimals: number = 18) =>
  parseInt(value, 16) / Math.pow(10, decimals);

export const getCurrencyValue = (v: number) =>
  v < 0.1 ? `$${v}` : `$${new Intl.NumberFormat('en-US').format(v)}`;

export const strWeiToStrEth = (weiString: string) => {
  const weiLength = weiString.length;

  if (weiLength <= 18) {
    const paddedWeiString = '0'.repeat(18 - weiLength) + weiString;

    const integerPart = '0';
    const decimalPart = paddedWeiString;
    const trimmedDecimalPart = decimalPart.replace(/0+$/, '');
    const ethString =
      trimmedDecimalPart.length > 0
        ? `${integerPart}.${trimmedDecimalPart}`
        : integerPart;

    return ethString;
  }

  const integerPart = weiString.slice(0, -18);
  const decimalPart = weiString.slice(-18);
  const trimmedDecimalPart = decimalPart.replace(/0+$/, '');
  const ethString =
    trimmedDecimalPart.length > 0
      ? `${integerPart}.${trimmedDecimalPart}`
      : integerPart;

  return ethString;
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
