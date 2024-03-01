'use client';

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';
import useSWR from 'swr';
import { getCurrencyValue } from '@/lib/utils';
import RemoveIcon from './icons/RemoveIcon';
import { removeAddresses } from '@/actions/addresses';
import AccountCardSkeleton from './AccountCardSkeleton';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AccountCard({
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
    <Link href={`/wallet-details/${address}`}>
      <Card className={`${className} max-w-[400px] group`}>
        <CardHeader className="flex gap-3">
          <Avatar name={name} color="secondary" />
          <div className="flex flex-col">
            <div className="text-md text-left flex items-center justify-between">
              <p>{name}</p>
              <form action={() => removeAddresses(id)}>
                <Button
                  variant="flat"
                  size="sm"
                  isIconOnly
                  className="bg-white -mt-4 -mr-3 opacity-0 group-hover:opacity-100"
                  title="Remove account"
                  type="submit"
                >
                  <RemoveIcon className="size-4 opacity-60 hover:opacity-100" />
                </Button>
              </form>
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
    </Link>
  );
}
