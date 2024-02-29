import AccountList from '@/components/AccountList';

export default async function Home() {
  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      <AccountList />
    </main>
  );
}
