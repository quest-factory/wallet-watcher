import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';
import useSWR from 'swr';
import { getCurrencyValue } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import TrashIcon from './icons/TrashIcon';
import { removeAddresses } from '@/actions/addresses';

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
  const router = useRouter();
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
    <Card
      className={`${className} max-w-[400px]`}
      isPressable
      onPress={() => {
        router.push(`/wallet-details/${address}`);
      }}
    >
      <CardHeader className="flex gap-3">
        <Avatar name={name} color="secondary" />
        <div className="flex flex-col">
          <div className="text-md text-left flex items-center justify-between">
            <p>{name}</p>
            <Button
              variant="flat"
              size="sm"
              isIconOnly
              className="bg-white mt-[-15px] mr-[-12px]"
              onPress={() => removeAddresses(name, address)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-default-500">{address}</p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <span className="flex items-center gap-1">
          <EthereumIcon className="h-4 w-4" />
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
