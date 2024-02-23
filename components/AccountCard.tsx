import { getBalance } from '@/lib/infura';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from '@nextui-org/react';

export default async function AccountCard({
  className = '',
  name,
  address,
}: {
  className?: string;
  name: string;
  address: string;
}) {
  const balance = await getBalance(address);

  return (
    <Card key={address} className={`${className} max-w-[400px]`}>
      <CardHeader className="flex gap-3">
        <Avatar name={name} />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-xs text-default-500">{address}</p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <p>{balance} ETH</p>
      </CardBody>
    </Card>
  );
}
