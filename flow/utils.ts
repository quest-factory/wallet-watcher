import { Tables } from '@/types_db';
import { CompanyEdge, CompanyNode } from './types';
import { XYPosition } from 'reactflow';

export const formatNodes = (dbNodes: Tables<'nodes'>[]): CompanyNode[] =>
  dbNodes?.map(({ id, ...nodeData }) => {
    // @ts-ignore
    const position: XYPosition = nodeData.position || { x: 0, y: 0 };
    return {
      type: 'custom',
      id: id.toString(),
      position,
      data: nodeData,
    };
  }) || [];

export const formatEdges = (dbEdges: Tables<'edges'>[]): CompanyEdge[] =>
  dbEdges?.map(({ id, source, target, label }) => ({
    type: 'custom',
    id: id.toString(),
    source,
    target,
    data: {
      label,
    },
  })) || [];
