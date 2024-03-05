import AccountCard, { AccountCardSkeleton } from '@/components/AccountCard';
import { getAddresses } from '@/lib/queries/addresses';
import { Suspense } from 'react';
import AddWalletModal from './AddWalletModal';

export default async function AccountList() {
  const wallets = await getAddresses();

  return (
    <section className="space-y-12 flex flex-col items-center">
      <div className="flex w-full justify-between px-5">
        <h2>Accounts</h2>
        <AddWalletModal />
      </div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-5 w-fit">
        {wallets &&
          wallets.map(({ notification_id, ...account }, index) => (
            <Suspense
              key={index}
              fallback={<AccountCardSkeleton key={index} className="mx-auto" />}
            >
              <AccountCard
                key={index}
                className="mx-auto"
                // @ts-ignore
                notification_id={notification_id?.id}
                {...account}
              />
            </Suspense>
          ))}
      </div>
    </section>
  );
}
