import AccountCard, { AccountCardSkeleton } from '@/components/AccountCard';
import { getAddresses } from '@/lib/queries/addresses';
import { Suspense } from 'react';
import AddWalletModal from './AddWalletModal';

export default async function AccountList() {
  const wallets = await getAddresses();

  return (
    <section className="space-y-12 flex flex-col items-center">
      <div className="flex w-full justify-between px-5">
        <div className="w-full" />
        <h3 className="w-full text-center">Accounts</h3>
        <div className="w-full flex justify-end">
          <AddWalletModal />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-5 w-fit">
        {wallets &&
          wallets.map((account, index) => (
            <Suspense
              key={index}
              fallback={<AccountCardSkeleton key={index} className="mx-auto" />}
            >
              <AccountCard key={index} className="mx-auto" {...account} />
            </Suspense>
          ))}
      </div>
    </section>
  );
}
