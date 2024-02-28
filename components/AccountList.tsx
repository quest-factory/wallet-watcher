'use client';

import { Suspense } from 'react';
import AccountCard, { AccountCardSkeleton } from '@/components/AccountCard';
import useLocalStorage from '@/lib/useLocalStorage';

export default function AccountList() {
  const { walletsLocal } = useLocalStorage();

  return (
    <section className="space-y-12 flex flex-col items-center">
      <h2>Accounts</h2>

      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3 w-fit">
        {walletsLocal.sort().map((account, index) => (
          <Suspense
            key={index}
            fallback={<AccountCardSkeleton className="mx-auto" />}
          >
            <AccountCard
              key={account.address}
              className="mx-auto"
              {...account}
            />
          </Suspense>
        ))}
      </div>
    </section>
  );
}
