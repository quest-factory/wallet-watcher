import { HolderResponse } from '@/app/api/holder/[address]/route';
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
          targetId={props.target}
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
    targetId,
    sourceId,
  }: {
    label?: string;
    sourceX: EdgeProps['sourceX'];
    sourceY: EdgeProps['sourceY'];
    sourcePosition: EdgeProps['sourcePosition'];
    targetX: EdgeProps['targetX'];
    targetY: EdgeProps['targetY'];
    targetPosition: EdgeProps['targetPosition'];
    targetId: EdgeProps['target'];
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
    const target = useMemo(
      () => nodes.find(({ id }) => id === targetId),
      [targetId, nodes]
    );
    const source = useMemo(
      () => nodes.find(({ id }) => id === sourceId),
      [targetId, nodes]
    );
    const address = source?.data?.address;
    const contractAddress = target?.data?.contractAddress;
    const response =
      contractAddress &&
      address &&
      useFetch<HolderResponse>(
        `/api/holder/${address}?contractAddress=${contractAddress}`
      );
    const percent = response && response.data?.percent;
    const shouldHide = !label && !percent;

    return (
      <EdgeLabelRenderer>
        {!false && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className={`${shouldHide ? 'hidden' : ''} bg-white rounded p-1 text-sm text-gray-600`}
          >
            {label}
            {percent && `${percent}%`}
          </div>
        )}
      </EdgeLabelRenderer>
    );
  }
);
