import AccountList from '@/components/AccountList';
import LoginForm from '@/components/LoginForm';
import { getUserSession } from '@/lib/queries/users';

export default async function Home() {
  const session = await getUserSession();

  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      {session ? <AccountList /> : <LoginForm className="mx-auto" />}
    </main>
  );
}
