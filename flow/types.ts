import { Tables } from '@/types_db';
import { Edge, Node } from 'reactflow';

export type CompanyNode = Node<{
  name: Tables<'nodes'>['name'];
  siren: Tables<'nodes'>['siren'];
  address: Tables<'nodes'>['address'];
}>;

export type CompanyEdge = Edge<{
  label: Tables<'edges'>['label'];
  // address: CompanyNode['data']['address'];
}>;
