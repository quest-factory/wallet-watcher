import { getQuotes } from '@/lib/coin_market';
import { getBalance } from '@/lib/infura';
import { getCurrencyValue } from '@/lib/utils';
import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';

export default async function AccountCard({
  className = '',
  name,
  address,
}: {
  className?: string;
  name: string;
  address: string;
}) {
  const [
    {
      data: { ETH },
    },
    balance,
  ] = await Promise.all([getQuotes('ETH'), getBalance(address)]);

  const {
    quote: {
      USD: { price },
    },
  } = ETH[0];

  return (
    <Card key={address} className={`${className} max-w-[400px]`}>
      <CardHeader className="flex gap-3">
        <Avatar name={name} color="secondary" />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-xs text-default-500">{address}</p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        {balance && (
          <span className="flex items-center gap-1">
            <EthereumIcon className="h-5 w-5" />
            {balance} ({getCurrencyValue(price * balance)})
          </span>
        )}
      </CardBody>
    </Card>
  );
}
