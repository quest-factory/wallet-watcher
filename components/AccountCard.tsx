import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';
import useSWR from 'swr';
import { getCurrencyValue } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AccountCard({
  className = '',
  name,
  address,
}: {
  className?: string;
  name: string;
  address: string;
}) {
  const { data: balance } = useSWR(`/api/balance/${address}`, fetcher);
  const {
    data: { data: quotes },
  } = useSWR('/api/quotes', fetcher, { suspense: true });

  const {
    quote: {
      USD: { price },
    },
  } = quotes.ETH[0];

  return (
    <Card className={`${className} max-w-[400px]`}>
      <CardHeader className="flex gap-3">
        <Avatar name={name} color="secondary" />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-xs text-default-500">{address}</p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <span className="flex items-center gap-1">
          <EthereumIcon className="h-5 w-5" />
          {balance} ({getCurrencyValue(price * balance)})
        </span>
      </CardBody>
    </Card>
  );
}

export function AccountCardSkeleton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <Card className={`${className} w-[378px]`}>
      <CardHeader className="flex gap-3">
        <Skeleton className="rounded-full w-10 h-10 flex-none" />
        <div className="flex flex-col w-full gap-1">
          <Skeleton className="h-3 w-1/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <span className="flex items-center gap-1">
          <EthereumIcon className="h-5 w-5" />
          <Skeleton className="h-3 w-1/5 rounded-lg" />
        </span>
      </CardBody>
    </Card>
  );
}
