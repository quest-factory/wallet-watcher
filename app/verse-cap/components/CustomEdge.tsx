import { memo } from 'react';
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  SmoothStepEdge,
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
  }: {
    label?: string;
    sourceX: EdgeProps['sourceX'];
    sourceY: EdgeProps['sourceY'];
    sourcePosition: EdgeProps['sourcePosition'];
    targetX: EdgeProps['targetX'];
    targetY: EdgeProps['targetY'];
    targetPosition: EdgeProps['targetPosition'];
  }) => {
    const [_, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    return (
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="bg-white rounded p-1 text-sm text-gray-600"
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    );
  }
);
