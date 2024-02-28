'use client';

import AccountList from '@/components/AccountList';
import LoginForm from '@/components/LoginForm';
import { useUser } from '@supabase/auth-helpers-react';

export default function Home() {
  const user = useUser();

  return (
    <main className="w-full mx-auto max-w-[80%] mt-10">
      {false ? <AccountList /> : <LoginForm className="mx-auto" />}
    </main>
  );
}
