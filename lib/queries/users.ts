import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function getUserSession() {
  const supabase = createClient(cookies());
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log(error.message);
  }

  return session;
}

export async function getUser() {
  const supabase = createClient(cookies());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error.message);
  }

  return user;
}
