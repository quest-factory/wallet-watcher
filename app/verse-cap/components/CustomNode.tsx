import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { Card, CardBody } from '@nextui-org/react';
import { Company } from '@/flow/types';

function CustomNode({
  id,
  data: { label, siren, address },
}: NodeProps<Company>) {
  return (
    <>
      <Card>
        <CardBody className="text-xs flex flex-col justify-center items-center">
          <p className="text-medium w-full text-center text-secondary font-bold">
            {label}
          </p>
          <p>{siren}</p>
          <p>{address}</p>
        </CardBody>
      </Card>
      <Handle
        type="target"
        position={Position.Top}
        id={id}
        className="border-2"
      />
      <Handle type="source" position={Position.Bottom} id={id} />
    </>
  );
}

export default memo(CustomNode);
