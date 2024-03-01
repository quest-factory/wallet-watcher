import AccountCard from '@/components/AccountCard';
import { getAddresses } from '@/lib/queries/addresses';
import { Suspense } from 'react';
import AccountCardSkeleton from './AccountCardSkeleton';

export default async function AccountList() {
  const wallets = await getAddresses();

  return (
    <section className="space-y-12 flex flex-col items-center">
      <h2>Accounts</h2>

      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3 w-fit">
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
