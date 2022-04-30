import { TextField, styled } from '@mui/material';

const Input = styled(TextField)(({ theme }) => ({
  minWidth: 300,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export default Input;
