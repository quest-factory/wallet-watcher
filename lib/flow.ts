import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { Edge, Node, XYPosition } from 'reactflow';
import { Tables } from '@/types_db';

// ################################################# NODES
type CompanyNode = Node<{
  name: Tables<'nodes'>['name'];
  siren: Tables<'nodes'>['siren'];
  address: Tables<'nodes'>['address'];
}>;
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

// ################################################# EDGES
type CompanyEdge = Edge<{
  label: Tables<'edges'>['label'];
  // address: CompanyNode['data']['address'];
}>;
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
