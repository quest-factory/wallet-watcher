import { Snippet } from '@nextui-org/react';
import TransactionsTable from './component/TransactionTable';
import { Suspense } from 'react';
import BalanceSnippet from './component/BalanceSnippet';
import BalanceSnippetSkeleton from './component/BalanceSnippetSkeleton';

export default async function WalletDetails({
  params,
}: {
  params: { address: string };
}) {
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
            <Suspense fallback={<BalanceSnippetSkeleton />}>
              <BalanceSnippet address={params.address} />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <TransactionsTable address={params.address} />
        </div>
      </section>
    </main>
  );
}
