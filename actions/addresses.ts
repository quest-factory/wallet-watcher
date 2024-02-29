'use server';

import { cookies } from 'next/headers';
import { Tables } from '../types_db';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
    .select('name, address')
    .eq('user_id', session.user.id)
    .order('id', { ascending: true });

  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function addAddresses({
  address,
  name,
}: Omit<Tables<'addresses'>, 'id' | 'user_id'>) {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { statusText, error } = await supabase
    .from('addresses')
    .insert({ address, name, user_id: session.user.id });

  if (error) {
    console.log(error.message);
  }

  revalidatePath('/');
  return statusText;
}

export async function addAddressesSubmit(_: any, formData: FormData) {
  const address = formData.get('address')?.toString();
  const name = formData.get('name')?.toString();

  if (!name || !address) {
    return;
  }

  const statusText = await addAddresses({ address, name });
  return { message: statusText };
}
