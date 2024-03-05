import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tooltip,
} from '@nextui-org/react';
import EthereumIcon from '../icons/EthereumIcon';
import { getCurrencyValue } from '@/lib/utils';
import RemoveIcon from '../icons/RemoveIcon';
import { getBalance } from '@/lib/infura';
import { getQuotes } from '@/lib/coin_market';
import { removeAddresses } from '@/actions/addresses';
import Link from 'next/link';

export default async function AccountCard({
  className = '',
  name,
  address,
  id,
}: {
  className?: string;
  name: string;
  address: string;
  id: number;
}) {
  const [quotes, balance] = await Promise.all([
    getQuotes('ETH'),
    getBalance(address),
  ]);
  const price = quotes?.data.ETH[0]?.quote?.USD?.price || 0;
  const removeAddressesAction = removeAddresses.bind(null, id);

  return (
    <Link href={`/wallet-details/${address}`}>
      <Card className={`${className} max-w-96 group relative`}>
        <CardHeader className="flex gap-3">
          <Avatar name={name} color="secondary" className="size-10 flex-none" />
          <div className="flex flex-col truncate">
            <p>{name}</p>
            <p className="text-small truncate text-default-500">{address}</p>
          </div>

          <div className="absolute top-1 right-2">
            <form action={removeAddressesAction}>
              <Tooltip
                color="foreground"
                content="Remove account"
                showArrow={true}
              >
                <button
                  className="opacity-0 group-hover:opacity-100"
                  type="submit"
                >
                  <RemoveIcon className="size-4 opacity-60 hover:opacity-100" />
                </button>
              </Tooltip>
            </form>
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          <span className="flex items-center gap-1">
            <EthereumIcon className="h-4 w-4" />
            {balance} (
            {balance !== undefined && getCurrencyValue(price * balance)})
          </span>
        </CardBody>
      </Card>
    </Link>
  );
}
