import { styled, TextField } from '@mui/material';

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Input = styled(TextField)(({ theme }) => ({
  minWidth: 400,
  marginTop: theme.spacing(1),
}));
