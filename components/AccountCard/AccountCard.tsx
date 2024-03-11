import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import EthereumIcon from '../icons/EthereumIcon';
import { getCurrencyValue } from '@/lib/utils';
import { getBalance } from '@/lib/infura';
import { getQuotes } from '@/lib/coin_market';
import Link from 'next/link';
import Buttons from './Buttons';
import { Tables } from '@/types_db';
import BellIcon from '../icons/BellIcon';

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
    <Card className={`${className}`} fullWidth>
      <Link className="w-full" href={`/wallet-details/${address}`}>
        <CardHeader className="flex gap-3">
          <Avatar name={name} color="secondary" className="size-10 flex-none" />
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-1">
              {name}
              {alert_enabled && (
                <span title="Alert enabled">
                  <BellIcon
                    className="size-3 text-default-600"
                    fill="currentColor"
                  />
                </span>
              )}
            </div>
            <p className="text-small truncate text-default-500">{address}</p>
          </div>

          <Buttons addressId={id} alert_enabled={alert_enabled} />
        </CardHeader>

        <Divider />

        <CardBody>
          <span className="flex items-center gap-1 text-default-700">
            <EthereumIcon className="size-4" />
            {balance} (
            {balance !== undefined &&
              getCurrencyValue(price * balance).replace(/,/g, ' ')}
            )
          </span>
        </CardBody>
      </Link>
    </Card>
  );
}
