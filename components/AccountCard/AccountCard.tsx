import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import EthereumIcon from '../icons/EthereumIcon';
import { getCurrencyValue } from '@/lib/utils';
import { getBalance } from '@/lib/infura';
import { getQuotes } from '@/lib/coin_market';
import Link from 'next/link';
import Buttons from './Buttons';
import { Tables } from '@/types_db';

export default async function AccountCard({
  className = '',
  name,
  address,
  id,
  alert_enabled,
}: {
  className?: string;
  name: string;
  address: string;
  id: number;
  alert_enabled: Tables<'addresses'>['alert_enabled'];
}) {
  const [quotes, balance] = await Promise.all([
    getQuotes('ETH'),
    getBalance(address),
  ]);
  const price = quotes?.data.ETH[0]?.quote?.USD?.price || 0;

  return (
    <Link href={`/wallet-details/${address}`}>
      <Card className={`${className} max-w-96 group`}>
        <CardHeader className="flex gap-3">
          <Avatar name={name} color="secondary" className="size-10 flex-none" />
          <div className="flex flex-col truncate">
            <p>{name}</p>
            <p className="text-small truncate text-default-500">{address}</p>
          </div>

          <Buttons addressId={id} alert_enabled={alert_enabled} />
        </CardHeader>

        <Divider />

        <CardBody>
          <span className="flex items-center gap-1">
            <EthereumIcon className="h-4 w-4" />
            {balance} (
            {balance !== undefined &&
              getCurrencyValue(price * balance).replace(/,/g, ' ')}
            )
          </span>
        </CardBody>
      </Card>
    </Link>
  );
}
