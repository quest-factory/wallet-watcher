import { CustomEdge } from '@/app/verse-cap/components/CustomEdge';
import CustomNode from '@/app/verse-cap/components/CustomNode';
import { Tables } from '@/types_db';
import { Edge, Node } from 'reactflow';

export const nodeTypes = {
  custom: CustomNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

export type Company = {
  label: Tables<'nodes'>['label'];
  siren: Tables<'nodes'>['siren'];
  address: Tables<'nodes'>['address'];
};
export type CompanyNode = Node<Company>;

export type CompanyEdge = Edge<{
  label: Tables<'edges'>['label'];
}>;
