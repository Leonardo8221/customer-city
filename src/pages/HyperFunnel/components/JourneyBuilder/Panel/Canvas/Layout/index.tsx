import { FunctionComponent, useCallback } from 'react';
import ReactFlow, {
  Background,
  Node,
  NodeTypes,
  useReactFlow,
  MarkerType,
  ReactFlowProvider,
} from 'react-flow-renderer';

import { useJourneyBuilder } from '../../../JourneyBuilderProvider';
import ResizeRotateNode from 'pages/HyperFunnel/components/JourneyBuilder/Panel/ResizeRotateNode';

const nodeTypes: NodeTypes = {
  resizeRotate: ResizeRotateNode as FunctionComponent,
};
const proOptions = { account: 'paid-pro', hideAttribution: true };

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: '#9ca8b3' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  zIndex: 1,
};

export default function CanvasLayout() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

function ReactFlowPro() {
  const { getNodes, setNodes } = useReactFlow();
  const { layoutNodes } = useSubPanels();

  const onMoveStart = useCallback(() => {
    const nodes = getNodes().map((n) => {
      n.selected = false;
      return n;
    });

    setNodes(nodes);
  }, [getNodes, setNodes]);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      defaultNodes={layoutNodes}
      defaultEdgeOptions={defaultEdgeOptions}
      onMoveStart={onMoveStart}
      proOptions={proOptions}
    >
      <Background />
    </ReactFlow>
  );
}

function useSubPanels() {
  const { pipeline } = useJourneyBuilder();
  const { pipelineStages } = pipeline;

  const layoutNodes: Node[] = pipelineStages.map((pipelineStage, index) => {
    const unitWidth = 500;
    const node: Node = {
      id: index.toString(),
      data: {
        label: `${pipelineStage.pipelineStageName} (${pipelineStage.title}) `,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        width: unitWidth,
        height: '100%',
        offsetX: index * unitWidth,
        offsetY: 0,
      },
      className: 'light',
      type: 'resizeRotate',
      position: {
        x: index * unitWidth + 20,
        y: 0,
      },
      draggable: false,
    };

    return node;
  });

  return {
    layoutNodes,
  };
}
