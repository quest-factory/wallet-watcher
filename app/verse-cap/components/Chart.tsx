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
import { MouseEvent, useCallback } from 'react';
import { CompanyEdge, CompanyNode } from '@/flow/types';
import { createEdge, updateNode } from '@/flow/action';

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
    async (connection) => {
      if (connection.source && connection.target) {
        createEdge({
          source: connection.source,
          target: connection.target,
        });
        setEdges((edges) => addEdge(connection, edges));
      }
    },
    [setEdges]
  );

  const handleNodeDragStop = useCallback(
    async (_: MouseEvent, node: CompanyNode) => {
      await updateNode(node);
    },
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDragStop={handleNodeDragStop}
      fitView
      attributionPosition="top-right"
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
