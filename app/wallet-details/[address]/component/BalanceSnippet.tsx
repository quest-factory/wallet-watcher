import EthereumIcon from '@/components/icons/EthereumIcon';
import { getQuotes } from '@/lib/coin_market';
import { getBalance } from '@/lib/infura';
import { getCurrencyValue } from '@/lib/utils';
import { Snippet } from '@nextui-org/react';

interface BalanceSnippetProps {
  address: string;
}

export default async function BalanceSnippet({ address }: BalanceSnippetProps) {
  const [balance, quotes] = await Promise.all([
    getBalance(address),
    getQuotes('ETH'),
  ]);
  const price = quotes?.data.ETH[0]?.quote?.USD?.price || 0;

  return (
    <>
      <p className="font-bold">Balance</p>
      <Snippet
        hideSymbol
        hideCopyButton
        variant="bordered"
        className="bg-white"
        classNames={{
          pre: 'truncate',
          content: 'flex-row items-center gap-1 truncate',
        }}
        size="lg"
      >
        <EthereumIcon className="size-4" />
        <span>{balance}</span>
        <span className="text-default-500">
          ~{balance !== undefined && getCurrencyValue(price * balance)}
        </span>
      </Snippet>
    </>
  );
}
