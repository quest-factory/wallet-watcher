import { Company } from '@/flow/types';
import useFetch from '@/hooks/useFetch';
import { memo, useMemo } from 'react';
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  SmoothStepEdge,
  useNodes,
} from 'reactflow';

export const CustomEdge = memo(
  ({ data, ...props }: EdgeProps<{ label: string }>) => (
    <SmoothStepEdge
      {...props}
      label={
        <CustomEdgeLabel
          label={data?.label}
          sourceX={props.sourceX}
          sourceY={props.sourceY}
          sourcePosition={props.sourcePosition}
          targetX={props.targetX}
          targetY={props.targetY}
          targetPosition={props.targetPosition}
          sourceId={props.source}
        />
      }
    />
  )
);

const CustomEdgeLabel = memo(
  ({
    label,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    sourceId,
  }: {
    label?: string;
    sourceX: EdgeProps['sourceX'];
    sourceY: EdgeProps['sourceY'];
    sourcePosition: EdgeProps['sourcePosition'];
    targetX: EdgeProps['targetX'];
    targetY: EdgeProps['targetY'];
    targetPosition: EdgeProps['targetPosition'];
    sourceId: EdgeProps['source'];
  }) => {
    const [_, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    const nodes = useNodes<Company>();
    const source = useMemo(
      () => nodes.find(({ id }) => id === sourceId),
      [sourceId, nodes]
    );
    const address = source?.data?.address;
    const { data, loading } = useFetch(`/api/balance/${address}`);

    return (
      <EdgeLabelRenderer>
        {!loading && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="bg-white rounded p-1 text-sm text-gray-600"
          >
            {label}
            {data}
          </div>
        )}
      </EdgeLabelRenderer>
    );
  }
);
