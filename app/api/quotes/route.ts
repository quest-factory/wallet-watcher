import { getQuotes } from '@/lib/coin_market';

export async function GET() {
  const data = await getQuotes('ETH');

  return Response.json(data);
}
