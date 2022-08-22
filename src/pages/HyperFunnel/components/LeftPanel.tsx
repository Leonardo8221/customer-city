import { FC, useState, useEffect } from 'react';

import { ReactComponent as BlocksIcon } from 'assets/icons/blocks.svg';
import { PrimaryButton } from 'components/ui';
import { Product } from 'store/product/types';
import { useProduct } from 'store/product/hooks';
import { useAuth } from 'store/auth/hooks';
import MuiBox from '@mui/material/Box';
import { Button, IconButton, styled } from '@mui/material';
import { usePipelines } from '../PipelinesProvider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useToggle } from 'utils/toggle';
import { HyperFunnelModal } from 'pages/HyperFunnel/components';
import Paper from '@mui/material/Paper';

export default function HyperFunnel() {
  const { baseStages, pipelines, setEditPipeline, deletePipeline } = usePipelines();
  const { flag, toggle } = useToggle();

  const edit = (id: number) => {
    setEditPipeline(id);
    toggle();
  };
  return (
    <Paper style={{ height: '100%' }}>
      <HyperFunnelModal open={flag} toggleOpen={toggle} />
      <Typography variant="h2" sx={{ color: 'neutral.main', mt: 3, mx: 4 }}>
        HyperFunnel
      </Typography>

      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="inherit" sx={{ color: 'neutral.main', mt: 3, mx: 4 }}>
            Pipelines: {pipelines.length}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={toggle}>+ New Pipeline</Button>
        </Grid>
      </Grid>

      <Grid container>
        {pipelines.map((pipeline, index) => (
          <Grid container key={index} justifyContent="space-between">
            <Grid item>
              <Typography variant="inherit" sx={{ color: 'neutral.main', mt: 3, mx: 4 }}>
                {pipeline.pipelineName}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  edit(pipeline.pipelineId);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  deletePipeline(pipeline.pipelineId);
                }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export const Container = styled(MuiBox)(() => ({
  flex: 1,
  display: 'flex',
  backgroundColor: 'white',
}));

export const RightContainer = styled(MuiBox)(() => ({ padding: 24, width: 400 }));

export const LeftContainer = styled(MuiBox)(() => ({
  position: 'relative',
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));
