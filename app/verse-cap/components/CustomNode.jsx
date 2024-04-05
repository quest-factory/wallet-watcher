import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';

function CustomNode({ id, data }) {
  return (
    <>
      <Card>
        <CardBody className="text-xs flex flex-col justify-center items-center">
          <p className="text-medium w-full text-center text-secondary font-bold">
            {data.label}
          </p>
          <p>{data.siren}</p>
          <p>{data.address}</p>
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
