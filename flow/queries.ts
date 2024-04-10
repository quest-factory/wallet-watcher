import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { CompanyEdge, CompanyNode } from './types';
import { formatEdges, formatNodes } from './utils';

export async function getNodes(): Promise<CompanyNode[]> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('nodes')
    .select('*')
    .order('label', { ascending: true });

  if (error) {
    console.error(error.message);
  }

  const nodes = formatNodes(data || []);

  return nodes;
}

export async function getEdges(): Promise<CompanyEdge[]> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from('edges').select('*');

  if (error) {
    console.error(error.message);
  }

  const edges = formatEdges(data || []);

  return edges;
}
