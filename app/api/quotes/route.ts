import { getQuotes } from '@/lib/coin_market';
import { unstable_noStore as noStore } from 'next/cache';

export const revalidate = 600;
export async function GET() {
  noStore();
  const data = await getQuotes('ETH');

  return Response.json(data);
}
