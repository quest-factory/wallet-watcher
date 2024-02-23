import AccountCard from '@/components/AccountCard';

export default async function Home() {
  const ACCOUNTS = [
    { name: 'John', address: '0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5' },
    { name: 'Marie', address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5' },
    { name: 'Tod', address: '0xc964D6AbAF8648642d984fb70C295b8e49bB4AF6' },
  ];

  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      <section className="space-y-12">
        <h1>Accounts</h1>

        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3">
          {ACCOUNTS.sort().map((account) => (
            <AccountCard
              key={account.address}
              className="mx-auto"
              {...account}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
