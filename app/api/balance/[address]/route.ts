import { getBalance } from '@/lib/infura';

export const revalidate = 300;
export async function GET(
  _: Request,
  { params: { address } }: { params: { address: string } }
) {
  const data = await getBalance(address);

  return Response.json(data);
}
