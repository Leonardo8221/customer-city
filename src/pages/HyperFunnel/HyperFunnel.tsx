import PipelinesProvider from './PipelinesProvider';
import PipelinesList from 'pages/HyperFunnel/components/PipelinesList';
import EmptyHyperFunnel from 'pages/HyperFunnel/EmptyHyperFunnel';

export default function HyperFunnel() {
  return (
    <PipelinesProvider>
      <PipelinesList />
      <EmptyHyperFunnel />
    </PipelinesProvider>
  );
}
