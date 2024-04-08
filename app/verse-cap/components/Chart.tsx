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
import { CompanyEdge, CompanyNode, edgeTypes, nodeTypes } from '@/flow/types';
import { createEdge, removeNode, updateNode } from '@/flow/action';
import NodeModal from './NodeModal';

export default function Chart({
  initialNodes,
  initialEdges,
}: {
  initialNodes: CompanyNode[];
  initialEdges: CompanyEdge[];
}) {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
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

  const handleDeleteNode = useCallback(async (nodes: CompanyNode[]) => {
    const { id } = nodes[0];
    await removeNode(id);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDragStop={handleNodeDragStop}
      onNodesDelete={handleDeleteNode}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <Controls>
        <NodeModal nodes={nodes} />
      </Controls>
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
