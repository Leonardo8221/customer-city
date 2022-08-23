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
import HyperFunnelPipelineCard from 'pages/HyperFunnel/components/HyperFunnelPipelineCard'

export default function LeftPanel() {
  const { baseStages, pipelines, setEditPipeline, deletePipeline } = usePipelines();
  const { flag, toggle } = useToggle();

  const edit = (id: number) => {
    setEditPipeline(id);
    toggle();
  };
  return (
    <>
      <HyperFunnelModal open={flag} toggleOpen={toggle} />

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
            <HyperFunnelPipelineCard key={index} pipeline={pipeline} />
        ))}
      </Grid>
    </>
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
