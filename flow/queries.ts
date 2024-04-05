import { cookies } from 'next/headers';
import { XYPosition } from 'reactflow';
import { createClient } from '@/lib/supabase/server';
import { CompanyEdge, CompanyNode } from './types';

export async function getNodes(): Promise<CompanyNode[]> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('nodes')
    .select('*')
    .order('label', { ascending: true });

  if (error) {
    console.error(error.message);
  }

  const nodes =
    data?.map(({ id, label, siren, address, ...node }) => {
      // @ts-ignore
      const position: XYPosition = node.position || { x: 0, y: 0 };
      return {
        ...node,
        type: 'custom',
        id: id.toString(),
        position,
        data: {
          label,
          siren,
          address,
        },
      };
    }) || [];

  return nodes;
}

export async function getEdges(): Promise<CompanyEdge[]> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from('edges').select('*');

  if (error) {
    console.error(error.message);
  }

  const edges =
    data?.map(({ id, source, target, label }) => ({
      type: 'smoothstep',
      id: id.toString(),
      source,
      target,
      data: {
        label,
      },
    })) || [];

  return edges;
}
