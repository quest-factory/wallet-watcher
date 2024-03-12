import { Card, CardBody, Snippet } from '@nextui-org/react';
import TransactionsTable from './component/TransactionTable';
import { Suspense } from 'react';
import BalanceSnippet from './component/BalanceSnippet';
import BalanceSnippetSkeleton from './component/BalanceSnippetSkeleton';
import { getAddresses } from '@/lib/queries/addresses';
import AddWalletModal from '@/components/AddWalletModal';

export default async function WalletDetails({
  params,
}: {
  params: { address: string };
}) {
  const wallets = await getAddresses();

  const getCurrentWallet = () => {
    if (wallets) {
      return wallets.filter(
        (wallets) =>
          wallets.address.toLocaleLowerCase() ===
          params.address.toLocaleLowerCase()
      );
    }
    return [];
  };

  return (
    <main className="w-full mx-auto max-w-[80%] my-10">
      <section className="space-y-12 flex flex-col items-center">
        <div className="flex w-full justify-between px-5">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-center">Wallet details</h1>
            <div className="flex gap-5 justify-center items-center">
              {getCurrentWallet().length > 0 ? (
                <>
                  {getCurrentWallet().map((elem, index) => (
                    <p key={index} className="text-secondary font-bold">
                      {elem.name}
                    </p>
                  ))}
                </>
              ) : (
                <Card className="h-fit mt-fit">
                  <CardBody className="text-sm flex md:flex-row flex-col items-center justify-center gap-3 py-2">
                    <p className="text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      This wallet is not in your saved accounts.
                    </p>
                    <AddWalletModal
                      customText="Add this wallet"
                      addressPreset={params.address}
                      btnClassName="h-5"
                    />
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full md:flex-row flex-col justify-center gap-5">
          <div className="flex flex-col justify-items-center w-full text-center">
            <p className="font-bold">Address</p>
            <Snippet
              hideSymbol
              variant="bordered"
              className="bg-white text-secondary"
              classNames={{ pre: 'truncate' }}
              size="lg"
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
          <TransactionsTable address={params.address} wallets={wallets} />
        </div>
      </section>
    </main>
  );
}
