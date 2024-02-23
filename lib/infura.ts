import { hexToDecimals } from './utils';

const infuraHeaders = {
  Accept: 'application/json',
};

export async function getBalance(addr: string) {
  const response = await fetch(
    `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    {
      headers: infuraHeaders,
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [addr, 'latest'],
      }),
    }
  );
  const { result } = await response.json();

  return hexToDecimals(result);
}
