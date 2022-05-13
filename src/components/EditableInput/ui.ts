import { styled, Box, IconButton } from '@mui/material';

export const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ small = true }) => ({
  paddingRight: small ? 32 : 0,
  paddingBottom: small ? 0 : 40,
  width: 'fit-content',
  position: 'relative',
}));

export const EditButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ theme, small = true }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  position: 'absolute',
  padding: 0,
  right: small ? 4 : 'unset',
  top: small ? 20 : 'unset',
  bottom: small ? 'unset' : 0,
  left: small ? 'unset' : 0,
  backgroundColor: small ? 'transparent' : theme.palette.darkBg.main,
}));
