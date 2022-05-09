import { styled, Box } from '@mui/material';

import { NAV_BAR_HEIGHT } from 'core/constants';

export const Container = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  paddingTop: NAV_BAR_HEIGHT,
}));
