import { FC, useState, useCallback } from 'react';
import { styled, CircularProgress as MuiCircularProgress } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

import { logout as logoutApi } from 'http/auth';
import { useAuth } from 'store/auth/hooks';

const LoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const LogoutButton: FC = () => {
  const [loading, setLoading] = useState(false);
  const { id, logout } = useAuth();

  const logUserOut = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      await logoutApi(id);
      logout();
    } catch (error) {
      /** */
    }
  }, [id, logout]);

  return (
    <LoadingButton onClick={logUserOut} loading={loading} loadingIndicator={<CircularProgress size={18} />}>
      Log out
    </LoadingButton>
  );
};

export default LogoutButton;
