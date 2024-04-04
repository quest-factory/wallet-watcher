'use server';

import { createClient } from '@/lib/supabase/server';
import { Json, Tables } from '@/types_db';
import { cookies } from 'next/headers';
import { CompanyNode } from './types';

export async function handleSubmitNode(state: any, formData: FormData) {
  const label = formData.get('label')?.toString();
  const siren = formData.get('siren')?.toString() || null;
  const address = formData.get('address')?.toString() || null;
  const edge_label = formData.get('edge_label')?.toString();
  const source = formData.get('source')?.toString();
  const target = formData.get('target')?.toString();

  if (label)
    await createNode({
      label,
      siren,
      address,
    });

  if (source && target) await createEdge({ label: edge_label, source, target });

  return state;
}

// ############################################ CREATE
export async function createNode({
  label,
  siren,
  address,
}: {
  label: Tables<'nodes'>['label'];
  siren: Tables<'nodes'>['siren'];
  address: Tables<'nodes'>['address'];
}) {
  const supabase = createClient(cookies());
  const { error } = await supabase
    .from('nodes')
    .insert({ label, siren, address });

  if (error) {
    console.error(error.message);
  }
}

export async function createEdge({
  label,
  source,
  target,
}: {
  label?: Tables<'edges'>['label'];
  source: Tables<'edges'>['source'];
  target: Tables<'edges'>['target'];
}) {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('edges').insert({
    label,
    source,
    target,
  });

  if (error) {
    console.error(error.message);
  }
}

// ############################################ REMOVE
export async function removeNode(id: Tables<'nodes'>['id']) {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('nodes').delete().eq('id', id);
  if (error) console.error(error.message);
}

export async function removeEdge(id: Tables<'edges'>['id']) {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('edges').delete().eq('id', id);
  if (error) console.error(error.message);
}

// ############################################ UPDATE
export async function updateNode({
  id,
  data: { label, siren, address },
  ...node
}: CompanyNode) {
  const supabase = createClient(cookies());
  // @ts-ignore
  const position = node.position as Json;
  const { data, status, statusText, error } = await supabase
    .from('nodes')
    .update({ label, position, siren, address })
    .eq('id', id);

  if (error) console.error(error.message);

  return { data, status, statusText, error };
}
