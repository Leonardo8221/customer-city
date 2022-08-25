import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Pipeline, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import DeleteForever from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';

import { IconButton, styled } from '@mui/material';
import { useToggle } from 'utils/toggle';
import { HyperFunnelModal } from 'pages/HyperFunnel/components';

export default function HyperFunnelPipelineCard(props: {
  pipeline: Pipeline & {
    pipelineId: number;
  };
}) {
  const { setEditPipeline, deletePipeline } = usePipelines();
  const { flag, toggle } = useToggle();

  const onEdit = () => {
    setEditPipeline(props.pipeline.pipelineId);
    toggle();
  };

  const onDelete = () => {
    deletePipeline(props.pipeline.pipelineId);
  };

  return (
    <StyledCard>
      <HyperFunnelModal open={flag} toggleOpen={toggle} />
      <CardHeader
        title={props.pipeline.pipelineName}
        action={
          <>
            <IconButton onClick={onEdit}>
              <DescriptionIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteForever />
            </IconButton>
          </>
        }
      />
    </StyledCard>
  );
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: 2,
  marginBottom: 2,
  borderColor: 'blue',
  borderWidth: 4,
  color: 'blue',
}));
