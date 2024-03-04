'use client';

import EthereumIcon from '@/components/icons/EthereumIcon';
import {
  reduceWalletAddress,
  strWeiToStrEth,
  timeStampToDate,
} from '@/lib/utils';
import {
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
const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface TransactionsTableProps {
  address: string;
}

export default function TransactionsTable({ address }: TransactionsTableProps) {
  const { data: transactions, isLoading } = useSWR(
    `/api/transactions/${address}`,
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
              <Table aria-label="Example static collection table w-full">
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
                        <TableCell>{index + 1}</TableCell>
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
                            <p className="cursor-text w-fit">
                              {reduceWalletAddress(elem.from)}
                            </p>
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
                            <p className="cursor-pointer w-fit">
                              {reduceWalletAddress(elem.to)}
                            </p>
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
