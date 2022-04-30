import { styled, Button as MuiButton, TextField } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

export const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

export const Input = styled(TextField)(({ theme }) => ({
  minWidth: 300,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const LoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
