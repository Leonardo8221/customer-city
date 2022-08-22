import { FC, useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { ReactComponent as BlocksIcon } from 'assets/icons/blocks.svg';
import { PrimaryButton } from 'components/ui';
import { Product } from 'store/product/types';
import { useProduct } from 'store/product/hooks';
import { useAuth } from 'store/auth/hooks';
import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material';
import { usePipelines } from '../PipelinesProvider';
import LeftPanel from 'pages/HyperFunnel/components/LeftPanel';

export default function HyperFunnel() {
  const { baseStages, pipelines } = usePipelines();

  return (
    <Container>
      <LeftContainer>
        <LeftPanel />
      </LeftContainer>
      <RightContainer />
    </Container>
  );
}

export const Container = styled(MuiBox)(() => ({
  flex: 1,
  display: 'flex',
  backgroundColor: '#EDF0F5',
}));

export const RightContainer = styled(MuiBox)(() => ({ padding: 24, width: 800 }));

export const LeftContainer = styled(MuiBox)(() => ({
  position: 'relative',
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));
