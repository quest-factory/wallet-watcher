'use client';

import AccountCard, { AccountCardSkeleton } from '@/components/AccountCard';
import useLocalStorage from '@/lib/useLocalStorage';
import { Suspense } from 'react';

export default function Home() {
  const { walletsLocal } = useLocalStorage();

  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      <section className="space-y-12">
        <h1>Accounts</h1>

        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3">
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
    </main>
  );
}
