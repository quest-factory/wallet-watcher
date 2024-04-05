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
    <form className="space-y-5" action={formAction}>
      <p className="text-center text-2xl">Node</p>
      <Input type="text" label="Name" name="label" size="sm" />
      <Input type="text" label="Siren" name="siren" size="sm" />
      <Input type="text" label="Wallet address" name="address" size="sm" />

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
