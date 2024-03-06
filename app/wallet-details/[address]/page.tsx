import {
  Badge,
  Button,
  Card,
  CardBody,
  Chip,
  Snippet,
} from '@nextui-org/react';
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
          <h3 className="w-full flex flex-col items-center justify-center">
            <p>Wallet details</p>
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
                <Card className="h-7 mt-5">
                  <CardBody className="text-sm flex flex-row items-center justify-center gap-3 py-2">
                    <p className="text-gray-600">
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
          </h3>
        </div>
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
          <TransactionsTable address={params.address} wallets={wallets} />
        </div>
      </section>
    </main>
  );
}
