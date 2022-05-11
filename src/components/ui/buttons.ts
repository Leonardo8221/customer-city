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

export const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  ':hover': {
    backgroundColor: theme.palette.primary.subtone3,
    color: theme.palette.primary.main,
  },
  ':active': {
    backgroundColor: theme.palette.primary.subtone2,
  },
  ':focused': {
    borderWidth: 2,
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
  },
}));

SecondaryButton.defaultProps = { variant: 'outlined' };

export const TextButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  color: theme.palette.neutral.main,
  ':hover': {
    backgroundColor: theme.palette.lightBg.main,
    color: theme.palette.neutral.main,
  },
  ':active': {
    backgroundColor: theme.palette.darkBg.main,
    color: theme.palette.neutral.main,
  },
  ':focused': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.neutral.main,
  },
  ':disabled': {
    backgroundColor: 'transparent',
  },
}));

TextButton.defaultProps = { variant: 'text' };
