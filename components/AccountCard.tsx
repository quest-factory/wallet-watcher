import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';
import { getCurrencyValue } from '@/lib/utils';
import RemoveIcon from './icons/RemoveIcon';
import { getBalance } from '@/lib/infura';
import { getQuotes } from '@/lib/coin_market';

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

  return (
    <Card className={`${className} max-w-[400px] group`}>
      <CardHeader className="flex gap-3">
        <Avatar name={name} color="secondary" />
        <div className="flex flex-col">
          <div className="text-md text-left flex items-center justify-between">
            <p>{name}</p>
            <Button
              variant="flat"
              size="sm"
              isIconOnly
              className="bg-white -mt-4 -mr-3 opacity-0 group-hover:opacity-100"
              title="Remove account"
            >
              <RemoveIcon className="size-4 opacity-60 hover:opacity-100" />
            </Button>
          </div>
          <p className="text-xs text-default-500">{address}</p>
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
  );
}
