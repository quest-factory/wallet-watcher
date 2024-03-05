'use server';

import { cookies } from 'next/headers';
import { Tables } from '../types_db';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addAddresses({
  address,
  name,
}: {
  address: Tables<'addresses'>['address'];
  name: Tables<'addresses'>['name'];
}) {
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
    console.error(error.message);
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

export async function removeAddresses(id: number) {
  if (!id) {
    return;
  }

  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { statusText, error } = await supabase
    .from('addresses')
    .delete()
    .eq('user_id', session.user.id)
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }

  revalidatePath('/');
  return statusText;
}
