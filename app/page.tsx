'use client'

import AccountCard from '@/components/AccountCard';
import useLocalStorage from '@/lib/useLocalStorage';

export default function Home() {
  const { walletsLocal } = useLocalStorage();

  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      <section className="space-y-12">
        <h1>Accounts</h1>

        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3">
          {walletsLocal.sort().map((account, index) => (
            <AccountCard
              key={index}
              className="mx-auto"
              {...account}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
