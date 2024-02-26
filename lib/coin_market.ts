import { QuotesRequest } from '@/types';

const coinMarketHeaders = {
  'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY || '',
  Accept: 'application/json',
};

export async function getQuotes(symbol: 'ETH') {
  const params = new URLSearchParams();
  symbol !== undefined && params.set('symbol', symbol);

  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?${params.toString()}`,
    { headers: coinMarketHeaders, next: { revalidate: 3600 } }
  );
  const data = (await response.json()) as Promise<QuotesRequest<typeof symbol>>;

  return data;
}
