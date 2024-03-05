import EthereumIcon from '@/components/icons/EthereumIcon';
import { getQuotes } from '@/lib/coin_market';
import { getBalance } from '@/lib/infura';
import { getCurrencyValue } from '@/lib/utils';
import { Snippet } from '@nextui-org/react';

interface BalanceSnippetProps {
  address: string;
}

export default async function BalanceSnippet({ address }: BalanceSnippetProps) {
  const balance = await getBalance(address);
  const quotes = await getQuotes('ETH');
  const price = quotes?.data.ETH[0]?.quote?.USD?.price || 0;

  return (
    <>
      <p className="font-bold">Balance</p>
      <Snippet
        hideSymbol
        hideCopyButton
        variant="bordered"
        className="bg-white h-12"
      >
        <div className="flex justify-center items-center gap-1 text-gray-600">
          <EthereumIcon className="h-4 w-4" />
          {`${balance} (${balance !== undefined && getCurrencyValue(price * balance).replace(/,/g, ' ')})`}
        </div>
      </Snippet>
    </>
  );
}
