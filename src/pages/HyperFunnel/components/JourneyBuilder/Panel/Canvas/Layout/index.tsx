import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Node,
  Edge,
  Connection,
} from 'react-flow-renderer';

import { useCallback } from 'react';
import { useJourneyBuilder } from '../../../JourneyBuilderProvider';

const initialNodes: Node[] = [
  {
    id: '2',
    data: { label: 'Group A' },
    position: { x: 0, y: 0 },
    className: 'light',
    style: {
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      width: 500,
      height: '100%',
    },
  },
  {
    id: '2a',
    data: { label: 'Node A.1' },
    position: { x: 10, y: 50 },
    parentNode: '2',
  },
  {
    id: '4',
    data: { label: 'Group B' },
    position: { x: 500, y: 0 },
    className: 'light',
    style: {
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      width: 500,
      height: '100%',
    },
  },
  {
    id: '4a',
    data: { label: 'Node B.1' },
    position: { x: 15, y: 65 },
    className: 'light',
    parentNode: '4',
    extent: 'parent',
  },
];

const initialEdges: Edge[] = [];

export default function CanvasLayout() {
  const { layoutNodes } = useSubPanels();

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      className="react-flow-subflows-example"
      fitView
    >
      <MiniMap />
      <Controls />
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
      },
      position: {
        x: index * unitWidth,
        y: 0,
      },
      className: 'light',
      style: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        width: unitWidth,
        height: '100%',
      },
    };

    return node;
  });

  return {
    layoutNodes,
  };
}
