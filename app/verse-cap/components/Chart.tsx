'use client';

import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  OnConnect,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './overview.css';
import { useCallback } from 'react';
import { CompanyEdge, CompanyNode } from '@/flow/types';

const onInit = (reactFlowInstance: any) =>
  console.log('flow loaded:', reactFlowInstance);

export default function Chart({
  initialNodes,
  initialEdges,
}: {
  initialNodes: CompanyNode[];
  initialEdges: CompanyEdge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
