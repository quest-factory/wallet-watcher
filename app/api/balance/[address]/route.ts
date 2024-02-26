import { getBalance } from '@/lib/infura';

export async function GET(
  _: Request,
  { params: { address } }: { params: { address: string } }
) {
  const data = await getBalance(address);

  return Response.json(data);
}
