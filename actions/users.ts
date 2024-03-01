'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signOutUser = async () => {
  const supabase = createClient(cookies());

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Err :', error.message);
    } else {
      console.log('Success');
      redirect('/');
    }
  } catch (signOutError: any) {
    console.error('Err : ', signOutError.message);
  }
};

export const getSession = async () => {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
