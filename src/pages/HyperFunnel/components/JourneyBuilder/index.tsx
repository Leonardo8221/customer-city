import PipelinesList from 'pages/HyperFunnel/components/PipelinesList';
import EmptyHyperFunnel from 'pages/HyperFunnel/EmptyHyperFunnel';
import ProductsProvider from 'providers/ProductsProvider';
import TenantUsersProvider from 'providers/TenantUsersProvider';
import PipelinesProvider, { Pipeline, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import { useParams } from 'react-router-dom';
import JourneyBuilderProvider, { useJourneyBuilder } from './JourneyBuilderProvider';
import PanelBodySidebar from 'components/PanelLayout/PanelBodySidebar';
import LeftPanel from './LeftPanel';
import Panel from './Panel';

export default function JourneyBuilder() {
  const { id: pipelineId } = useParams();

  return (
    <PipelinesProvider>
      <JourneyBuilderProvider pipelineId={Number(pipelineId)}>
        <Body />
      </JourneyBuilderProvider>
    </PipelinesProvider>
  );
}

function Body() {
  const { pipeline } = useJourneyBuilder();
  const title = `${pipeline.pipelineName} Builder`;

  return <PanelBodySidebar leftPanelChild={<LeftPanel />} middlePanelChild={<Panel />} leftPanelTitle={title} />;
}
