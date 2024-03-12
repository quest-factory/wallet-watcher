import { getTransactions } from '@/lib/etherscan';

export async function GET(
  _: Request,
  { params: { address, page } }: { params: { address: string; page: number } }
) {
  const data = await getTransactions(address, page.toString());

  return Response.json(data);
}
