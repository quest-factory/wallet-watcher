'use client';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import { handleSubmitNode } from '../../../flow/action';
import { Company, CompanyNode } from '../../../flow/types';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { addEdge, Connection, Edge, Node } from 'reactflow';

export default function NodeForm({
  nodes,
  setNodes,
  setEdges,
  onClose,
}: {
  nodes: CompanyNode[];
  setNodes: Dispatch<SetStateAction<Node<Company, string | undefined>[]>>;
  setEdges: Dispatch<SetStateAction<Edge<{ label: string }>[]>>;
  onClose: () => void;
}) {
  const [state, formAction] = useFormState(handleSubmitNode, {
    nodes: [],
    edges: [],
  });
  const nodeSelects = useMemo(() => {
    const n = [...nodes];
    n.unshift({
      id: 'null',
      position: { x: 0, y: 0 },
      data: { label: ' - ', address: null, siren: null, contractAddress: null },
    });
    return n;
  }, [nodes]);

  useEffect(() => {
    if (state.edges.length) {
      const connection: Connection = {
        source: state.edges[0].source,
        target: state.edges[0].target,
        sourceHandle: null,
        targetHandle: null,
      };
      setEdges((edges) => addEdge(connection, edges));
      onClose();
    }

    if (state.nodes.length) {
      setNodes((nodes) => [...nodes, ...state.nodes]);
      onClose();
    }
  }, [state]);

  return (
    <form className="space-y-5" action={formAction}>
      <p className="text-center text-2xl">Node</p>
      <Input type="text" label="Name" name="label" size="sm" />
      <Input type="text" label="Siren" name="siren" size="sm" />
      <Input type="text" label="Wallet address" name="address" size="sm" />
      <Input
        type="text"
        label="Contract address"
        name="contract_address"
        size="sm"
      />

      <p className="text-center text-2xl">Edge</p>
      <Input type="text" label="Edge label" name="edge_label" size="sm" />
      <Select label="Source" name="source" size="sm">
        {nodeSelects.map(({ id, data: { label } }) => (
          <SelectItem key={id} value={id}>
            {label}
          </SelectItem>
        ))}
      </Select>

      <Select label="Target" name="target" size="sm">
        {nodeSelects.map(({ id, data: { label } }) => (
          <SelectItem key={id} value={id}>
            {label}
          </SelectItem>
        ))}
      </Select>

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" color="primary" type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </Button>
  );
}
