import { Button as MuiButton, styled } from '@mui/material';

const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default Button;
