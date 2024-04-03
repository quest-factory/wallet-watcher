import { cookies } from 'next/headers';
import { XYPosition } from 'reactflow';
import { createClient } from '@/lib/supabase/server';
import { CompanyEdge, CompanyNode } from './types';

export async function getNodes(): Promise<CompanyNode[]> {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from('nodes').select('*');

  if (error) {
    console.error(error.message);
  }

  const nodes =
    data?.map(({ id, name, siren, address, ...node }) => {
      // @ts-ignore
      const position: XYPosition = node.position || { x: 0, y: 0 };
      return {
        ...node,
        id: id.toString(),
        position,
        data: {
          name: name || '',
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
      id: id.toString(),
      source: source.toString(),
      target: target.toString(),
      data: {
        label,
      },
    })) || [];

  return edges;
}
