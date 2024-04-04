'use client';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import {
  nodes as initialNodes,
  edges as initialEdges,
} from './initial-elements';

import 'reactflow/dist/style.css';
import './overview.css';

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: any) =>
  console.log('flow loaded:', reactFlowInstance);

export default function Chart() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={() => console.log('NODES change')}
      onEdgesChange={() => console.log('EDGES change')}
      onConnect={() => console.log('CONNECT')}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}
