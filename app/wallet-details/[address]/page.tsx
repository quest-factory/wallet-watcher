'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
      <section className="space-y-12">
        <h1>Wallet details</h1>

        <div className="flex flex-col gap-5">
          <p>Address : {params.address}</p>
          <p>Balance : {balance}</p>
        </div>

        <div className="flex flex-col gap-3">
          {transactions ? (
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>FROM</TableColumn>
                <TableColumn>TO</TableColumn>
                <TableColumn>VALUE</TableColumn>
              </TableHeader>
              <TableBody>
                {transactions.result.map((elem: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{elem.from}</TableCell>
                    <TableCell>{elem.to}</TableCell>
                    <TableCell>{elem.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </section>
    </main>
  );
}
