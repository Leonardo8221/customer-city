import { LoadingButton as MuiLoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

const LoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default LoadingButton;
