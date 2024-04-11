import { client } from '@/flow/viem';
import { ABI } from '@/flow/viem/ABI';
import { formatUnits } from 'viem';

export type HolderResponse = {
  error?: string;
  balance: string;
  totalSupply: string;
  percent: number;
};

export async function GET(
  request: Request,
  { params: { address } }: { params: { address: `0x${string}` } }
) {
  if (!address) return Response.json({ error: 'No address' });

  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get('contractAddress');
  if (!contractAddress) return Response.json({ error: 'No contract address' });

  // @ts-ignore
  const abi = ABI[contractAddress];
  if (!abi) return Response.json({ error: 'No ABI' });

  const balanceResponse = (await client.readContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'balanceOf',
    args: [address],
  })) as bigint;
  const balance = formatUnits(balanceResponse, 6);

  // @ts-ignore
  const totalSupplyResponse = (await client.readContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'totalSupply',
  })) as bigint;
  const totalSupply = formatUnits(totalSupplyResponse, 6);

  const percent = (parseInt(balance) / parseInt(totalSupply)) * 100;

  return Response.json({
    balance,
    totalSupply,
    percent,
  });
}
