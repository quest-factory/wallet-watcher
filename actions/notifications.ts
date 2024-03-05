'use server';

import { cookies } from 'next/headers';
import { createClient } from '../lib/supabase/server';
import { Tables } from '@/types_db';
import { revalidatePath } from 'next/cache';

export async function createNotification(
  address_id: Tables<'notifications'>['address_id']
) {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    console.error('user id undefined');
    return;
  }

  const { error } = await supabase
    .from('notifications')
    .insert({ address_id, user_id: user.id });

  if (error) {
    console.error(error.message);
  }

  revalidatePath('/');
}

export async function removeNotification(id: Tables<'notifications'>['id']) {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('notifications').delete().eq('id', id);

  if (error) {
    console.error(error.message);
  }

  revalidatePath('/');
}
