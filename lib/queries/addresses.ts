import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function getAddresses() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data, error } = await supabase
    .from('addresses')
    .select('name, address, id')
    .eq('user_id', session.user.id)
    .order('id', { ascending: true });

  if (error) {
    console.error(error.message);
  }

  return data;
}
