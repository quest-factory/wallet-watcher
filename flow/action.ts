'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function createNode(state: any, formData: FormData) {
  const name = formData.get('name')?.toString();
  const siren = formData.get('siren')?.toString();
  const address = formData.get('address')?.toString();
  const edge_label = formData.get('edge_label')?.toString();
  const source = formData.get('source')?.toString();
  const target = formData.get('target')?.toString();

  const supabase = createClient(cookies());

  if (name) {
    const { error: nodeError } = await supabase
      .from('nodes')
      .insert({ name, siren, address });

    if (nodeError) {
      console.error(nodeError.message);
    }
  }

  if (source !== undefined || target !== undefined) {
    const { error: edgeError } = await supabase.from('edges').insert({
      label: edge_label,
      source,
      target,
    });

    if (edgeError) {
      console.error(edgeError.message);
    }
  }

  return state;
}
