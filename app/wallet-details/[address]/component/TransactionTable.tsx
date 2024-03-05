'use client';

import EthereumIcon from '@/components/icons/EthereumIcon';
import {
  reduceWalletAddress,
  strWeiToStrEth,
  timeStampToDate,
} from '@/lib/utils';
import {
  Button,
  Link,
  Pagination,
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
}

export default function TransactionsTable({ address }: TransactionsTableProps) {
  const [pageIndex, setPageIndex] = useState(1);

  const { data: transactions, isLoading } = useSWR(
    `/api/transactions/${address}/${pageIndex}`,
    fetcher
  );

  return (
    <>
      {isLoading ? (
        <TransactionsTableSkeleton />
      ) : (
        <>
          {transactions &&
          transactions.result &&
          typeof transactions.result !== 'string' &&
          transactions.result.length > 0 ? (
            <>
              <p className="font-bold w-full text-center">
                Latest transactions
              </p>
              <Table
                aria-label="Example static collection table w-full"
                bottomContent={
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
                }
              >
                <TableHeader>
                  <TableColumn>#</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>FROM</TableColumn>
                  <TableColumn>TO</TableColumn>
                  <TableColumn>VALUE</TableColumn>
                </TableHeader>
                <TableBody>
                  {transactions.result
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
                        </TableCell>
                        <TableCell
                          className={
                            elem.to.toLocaleLowerCase() ==
                            address.toLocaleLowerCase()
                              ? 'text-secondary font-bold'
                              : ''
                          }
                        >
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
          ) : (
            <div className="text-center text-gray-600">
              No transactions for this address
            </div>
          )}
        </>
      )}
    </>
  );
}
