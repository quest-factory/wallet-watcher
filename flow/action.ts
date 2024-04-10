'use server';

import { createClient } from '@/lib/supabase/server';
import { Json, Tables } from '@/types_db';
import { cookies } from 'next/headers';
import { Company, CompanyEdge, CompanyNode } from './types';
import { formatEdges, formatNodes } from './utils';

type NodeFormState = {
  nodes: CompanyNode[];
  edges: CompanyEdge[];
};
export async function handleSubmitNode(
  prevState: NodeFormState,
  formData: FormData
) {
  const state = { ...prevState };
  const label = formData.get('label')?.toString();
  const siren = formData.get('siren')?.toString() || null;
  const address = formData.get('address')?.toString() || null;
  const contractAddress = formData.get('contract_address')?.toString() || null;
  const edge_label = formData.get('edge_label')?.toString();
  const source = formData.get('source')?.toString();
  const target = formData.get('target')?.toString();

  if (label) {
    const nodes = await createNode({
      label,
      siren,
      address,
      contractAddress,
    });
    state.nodes = formatNodes(nodes || []);
  }

  if (source && target) {
    const edges = await createEdge({ label: edge_label, source, target });
    state.edges = formatEdges(edges || []);
  }

  return state;
}

// ############################################ CREATE
export async function createNode(node: Company) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from('nodes').insert(node).select();

  if (error) {
    console.error(error.message);
  }

  return data;
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
  const { data, error } = await supabase
    .from('edges')
    .insert({
      label,
      source,
      target,
    })
    .select();

  if (error) {
    console.error(error.message);
  }

  return data;
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
