'use client';

import EthereumIcon from '@/components/icons/EthereumIcon';
import {
  reduceWalletAddress,
  strWeiToStrEth,
  timeStampToDate,
} from '@/lib/utils';
import {
  Button,
  Chip,
  Link,
  Skeleton,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react';

import useSWR from 'swr';
import TransactionsTableSkeleton from './TransactionsTableSkeleton';
import { useState } from 'react';
import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';
const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface TransactionsTableProps {
  address: string;
  wallets: any;
}

export default function TransactionsTable({
  address,
  wallets,
}: TransactionsTableProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const [seeNames, setSeeNames] = useState<boolean>(true);

  const { data: transactions, isLoading } = useSWR(
    `/api/transactions/${address}/${pageIndex}`,
    fetcher
  );

  const getName = (currentAddress: string) => {
    const findAccounts = wallets.filter(
      (wallets: any) =>
        wallets.address.toLocaleLowerCase() ===
        currentAddress.toLocaleLowerCase()
    );

    if (findAccounts.length > 0) {
      let finalName = '';
      findAccounts.map((elem: any, index: number) => {
        finalName = `${finalName}${index === 0 ? '' : ' / '}${elem.name}`;
      });
      return finalName;
    }

    return '';
  };

  const hasTransactions = (transactions: any) => {
    return (
      transactions &&
      transactions.result &&
      transactions.result.length > 0 &&
      transactions.result !== 'string'
    );
  };

  return (
    <>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="w-1/3" />
        <p className="font-bold text-center md:w-1/3 w-full">
          Latest transactions
        </p>
        <div className="flex md:justify-end justify-center items-center gap-3 w-1/3">
          <p className="text-gray-600 text-xs whitespace-no-wrap shrink-0">
            See accounts names
          </p>
          <Switch
            defaultSelected
            size="sm"
            aria-label="Automatic updates"
            color="secondary"
            onChange={(e: any) => setSeeNames(e.target.checked)}
          />
        </div>
      </div>
      <Table
        aria-label="Example static collection table w-full"
        bottomContent={
          !isLoading &&
          hasTransactions(transactions) && (
            <div className="flex w-full justify-center items-center">
              <Button
                isDisabled={pageIndex === 1}
                isIconOnly
                color="secondary"
                aria-label="previous"
                onPress={() => setPageIndex(pageIndex - 1)}
              >
                <ChevronLeft className="h-5 w-5 fill-white" />
              </Button>
              <Button disabled className="font-bold mx-5">
                {pageIndex}
              </Button>
              <Button
                isIconOnly
                color="secondary"
                aria-label="next"
                onPress={() => setPageIndex(pageIndex + 1)}
              >
                <ChevronRight className="h-5 w-5 fill-white" />
              </Button>
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>FROM</TableColumn>
          <TableColumn>TO</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? (
              <Spinner
                label="Loading transactions"
                color="secondary"
                labelColor="foreground"
              />
            ) : (
              'No transactions for this address'
            )
          }
        >
          {hasTransactions(transactions) &&
            transactions.result
              .sort(
                (a: any, b: any) =>
                  parseInt(b.timeStamp) - parseInt(a.timeStamp)
              )
              .map((elem: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{index + 20 * pageIndex}</TableCell>
                  <TableCell>{timeStampToDate(elem.timeStamp)}</TableCell>
                  <TableCell
                    className={
                      elem.from.toLocaleLowerCase() ==
                      address.toLocaleLowerCase()
                        ? 'text-secondary font-bold'
                        : ''
                    }
                  >
                    {getName(elem.from) && seeNames ? (
                      <Chip
                        size="sm"
                        color={
                          elem.from.toLocaleLowerCase() ==
                          address.toLocaleLowerCase()
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {getName(elem.from)}
                      </Chip>
                    ) : (
                      <Tooltip
                        color="foreground"
                        showArrow={true}
                        content={elem.from}
                      >
                        <Link
                          href={`/wallet-details/${elem.from}`}
                          className="text-current cursor-pointer hover:underline w-fit"
                        >
                          {reduceWalletAddress(elem.from)}
                        </Link>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell
                    className={
                      elem.to.toLocaleLowerCase() == address.toLocaleLowerCase()
                        ? 'text-secondary font-bold'
                        : ''
                    }
                  >
                    {getName(elem.to) && seeNames ? (
                      <Chip
                        size="sm"
                        color={
                          elem.to.toLocaleLowerCase() ==
                          address.toLocaleLowerCase()
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {getName(elem.to)}
                      </Chip>
                    ) : (
                      <Tooltip
                        color="foreground"
                        showArrow={true}
                        content={elem.to}
                      >
                        <Link
                          href={`/wallet-details/${elem.to}`}
                          className="text-current cursor-pointer hover:underline w-fit"
                        >
                          {reduceWalletAddress(elem.to)}
                        </Link>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-start items-center gap-1">
                      <EthereumIcon className="h-4 w-4" />
                      {strWeiToStrEth(elem.value)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
