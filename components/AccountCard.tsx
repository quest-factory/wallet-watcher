import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
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
        <span className="flex items-center gap-1">
          <EthereumIcon className="h-5 w-5" />
          {balance} ({getCurrencyValue(price * balance)})
        </span>
      </CardBody>
    </Card>
  );
}
