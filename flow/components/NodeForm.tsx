'use client';

import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import { createNode } from '../action';
import { CompanyNode } from '../types';

export default function NodeForm({ nodes }: { nodes: CompanyNode[] }) {
  const [_, formAction] = useFormState(createNode, {});

  return (
    <form className="max-w-80 space-y-5" action={formAction}>
      <p className="text-center">New node</p>
      <Input type="text" label="Name" name="name" />
      <Input type="text" label="Siren" name="siren" />
      <Input type="text" label="Wallet address" name="address" />

      {/* EDGE */}
      <Input type="text" label="Edge label" name="edge_label" />
      <Select label="Source" name="source">
        {nodes.map(({ id, data: { name } }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </Select>

      <Select label="Target" name="target">
        {nodes.map(({ id, data: { name } }) => (
          <SelectItem key={id} value={id}>
            {name}
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
