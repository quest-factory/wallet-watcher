'use client';

import EthereumIcon from '@/components/icons/EthereumIcon';
import {
  reduceWalletAddress,
  strWeiToStrEth,
  timeStampToDate,
} from '@/lib/utils';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Snippet,
} from '@nextui-org/react';

import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function WalletDetails({
  params,
}: {
  params: { address: string };
}) {
  const { data: transactions } = useSWR(
    `/api/transactions/${params.address}`,
    fetcher
  );
  const { data: balance } = useSWR(`/api/balance/${params.address}`, fetcher);

  console.log('transactions for addr ', params.address, transactions);
  console.log('balance for addr ', params.address, balance);

  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      <section className="space-y-12 flex flex-col items-center">
        <h2>Wallet details</h2>

        <div className="flex w-full justify-center gap-5">
          <div className="flex flex-col justify-items-center w-full text-center">
            <p className="font-bold">Address</p>
            <Snippet
              hideSymbol
              variant="bordered"
              className="bg-white h-12 text-secondary"
            >
              {params.address}
            </Snippet>
          </div>
          <div className="flex flex-col justify-items-center w-full text-center">
            <p className="font-bold">Balance</p>
            <Snippet
              hideSymbol
              hideCopyButton
              variant="bordered"
              className="bg-white h-12"
            >
              <div className="flex justify-center items-center gap-1 text-gray-600">
                <EthereumIcon className="h-4 w-4" />
                {balance}
              </div>
            </Snippet>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {transactions ? (
            <>
              {transactions.result.length > 0 ? (
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
                            <TableCell>
                              {timeStampToDate(elem.timeStamp)}
                            </TableCell>
                            <TableCell
                              className={
                                elem.from.toLocaleLowerCase() ==
                                params.address.toLocaleLowerCase()
                                  ? 'text-secondary font-bold'
                                  : ''
                              }
                            >
                              {reduceWalletAddress(elem.from)}
                            </TableCell>
                            <TableCell
                              className={
                                elem.to.toLocaleLowerCase() ==
                                params.address.toLocaleLowerCase()
                                  ? 'text-secondary font-bold'
                                  : ''
                              }
                            >
                              {reduceWalletAddress(elem.to)}
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
          ) : (
            <Spinner label="Loading transactions" color="secondary" />
          )}
        </div>
      </section>
    </main>
  );
}
