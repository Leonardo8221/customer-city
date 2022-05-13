import { styled, Box, IconButton } from '@mui/material';

export const Container = styled(Box)(() => ({
  paddingRight: 32,
  width: 'fit-content',
  position: 'relative',
}));

export const EditButton = styled(IconButton)(() => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  position: 'absolute',
  padding: 0,
  right: 4,
  top: 20,
}));
