'use server';

import { cookies } from 'next/headers';
import { Tables } from '../types_db';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SupabaseClient } from '@supabase/supabase-js';

async function checkUser(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  return user;
}

export async function addAddresses({
  address,
  name,
}: {
  address: Tables<'addresses'>['address'];
  name: Tables<'addresses'>['name'];
}) {
  const supabase = createClient(cookies());
  const user = await checkUser(supabase);

  const { statusText, error, status } = await supabase
    .from('addresses')
    .insert({ address, name, user_id: user.id });

  if (error) {
    console.error(error.message);
  }

  revalidatePath('/');
  return { statusText, status };
}

export async function addAddressesSubmit(_: any, formData: FormData) {
  const address = formData.get('address')?.toString();
  const name = formData.get('name')?.toString();

  if (!name || !address) {
    return;
  }

  const { statusText, status } = await addAddresses({ address, name });
  return { statusText, status };
}

export async function removeAddresses(id: number) {
  if (!id) {
    return;
  }

  const supabase = createClient(cookies());
  const user = await checkUser(supabase);

  const { statusText, error, status } = await supabase
    .from('addresses')
    .delete()
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }

  revalidatePath('/');
  return { statusText, status };
}

export async function updateAlert({
  id,
  alert_enabled,
}: {
  id: Tables<'addresses'>['id'];
  alert_enabled: Tables<'addresses'>['alert_enabled'];
}) {
  const supabase = createClient(cookies());

  const { error, status, statusText } = await supabase
    .from('addresses')
    .update({ alert_enabled: alert_enabled })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error.message);
  }

  revalidatePath('/');
  return { status, statusText };
}
