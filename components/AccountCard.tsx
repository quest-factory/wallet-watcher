'use client';

import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';
import useSWR from 'swr';
import { getCurrencyValue } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import AccountCardSkeleton from './AccountCardSkeleton';

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
  const { data: balance, isLoading: balanceIsLoading } = useSWR(
    `/api/balance/${address}`,
    fetcher
  );
  const { data: quotes, isLoading: quotesIsLoading } = useSWR(
    '/api/quotes',
    fetcher
  );

  const price = quotes?.data.ETH[0]?.quote?.USD?.price || 0;

  return balanceIsLoading && quotesIsLoading ? (
    <AccountCardSkeleton className="mx-auto" />
  ) : (
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
          <p className="text-md text-left">{name}</p>
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
