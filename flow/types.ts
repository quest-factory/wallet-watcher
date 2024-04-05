import { Tables } from '@/types_db';
import { Edge, Node } from 'reactflow';

export type Company = {
  label: Tables<'nodes'>['label'];
  siren: Tables<'nodes'>['siren'];
  address: Tables<'nodes'>['address'];
};
export type CompanyNode = Node<Company>;

export type CompanyEdge = Edge<{
  label: Tables<'edges'>['label'];
  // address: CompanyNode['data']['address'];
}>;
