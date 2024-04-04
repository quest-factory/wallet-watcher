'use client';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import { handleSubmitNode } from '../../../flow/action';
import { CompanyNode } from '../../../flow/types';
import { useMemo } from 'react';

export default function NodeForm({ nodes }: { nodes: CompanyNode[] }) {
  const [_, formAction] = useFormState(handleSubmitNode, {});
  const nodeSelects = useMemo(() => {
    const n = [...nodes];
    n.unshift({
      id: 'null',
      position: { x: 0, y: 0 },
      data: { label: ' - ', address: null, siren: null },
    });
    return n;
  }, [nodes]);

  return (
    <form className="max-w-80 space-y-5" action={formAction}>
      <p className="text-center">New node</p>
      <Input type="text" label="Name" name="label" />
      <Input type="text" label="Siren" name="siren" />
      <Input type="text" label="Wallet address" name="address" />

      {/* EDGE */}
      <Input type="text" label="Edge label" name="edge_label" />
      <Select label="Source" name="source">
        {nodeSelects.map(({ id, data: { label } }) => (
          <SelectItem key={id} value={id}>
            {label}
          </SelectItem>
        ))}
      </Select>

      <Select label="Target" name="target">
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