import { styled, Button as MuiButton } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

export const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const LoadingButton = styled(MuiLoadingButton, {
  shouldForwardProp: (prop) => prop !== 'marginTop',
})<{ marginTop?: string }>(({ marginTop }) => ({
  marginTop: marginTop ?? '0px',
}));

LoadingButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
};
