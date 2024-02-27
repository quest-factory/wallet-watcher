import { getTransactions } from '@/lib/etherscan';

export async function GET(
  _: Request,
  { params: { address } }: { params: { address: string } }
) {
  const data = await getTransactions(address);

  return Response.json(data);
}
