import { styled, Button as MuiButton, alpha } from '@mui/material';
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

export const LoadingRedButton = styled(MuiLoadingButton)(({ theme }) => ({
  color: theme.palette.red.main,
  borderColor: theme.palette.red.main,
  ':hover': {
    backgroundColor: alpha(theme.palette.red.light, 0.35),
    color: theme.palette.red.main,
    borderColor: theme.palette.red.main,
  },
  ':active': {
    backgroundColor: theme.palette.red.light,
  },
}));

LoadingRedButton.defaultProps = {
  variant: 'outlined',
};

export const PrimaryButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  ':hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  ':active': {
    backgroundColor: theme.palette.primary.main,
  },
  ':focused': {
    borderColor: theme.palette.primary.dark,
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
    '& svg, & svg path': {
      fill: theme.palette.neutral.white,
    },
  },
}));

PrimaryButton.defaultProps = { variant: 'contained' };

export const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  backgroundColor: theme.palette.neutral.white,
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
    '& svg, & svg path': {
      fill: theme.palette.primary.main,
    },
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

export const SecondaryRedButton = styled(SecondaryButton)(({ theme }) => ({
  color: theme.palette.red.main,
  borderColor: theme.palette.red.main,
  ':hover': {
    backgroundColor: alpha(theme.palette.red.light, 0.35),
    color: theme.palette.red.main,
    borderColor: theme.palette.red.main,
  },
  ':active': {
    backgroundColor: theme.palette.red.light,
  },
}));
