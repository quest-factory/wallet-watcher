import {
  Card,
  CardHeader,
  Skeleton,
  Divider,
  CardBody,
} from '@nextui-org/react';
import EthereumIcon from './icons/EthereumIcon';

export default function AccountCardSkeleton({
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
