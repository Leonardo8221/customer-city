import { FC, useState, useCallback } from 'react';
import { styled, CircularProgress as MuiCircularProgress, SxProps, Theme } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

import { logout as logoutApi } from 'http/auth';
import { useAuth } from 'store/auth/hooks';

const LoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  ...theme.typography.p14,
  color: theme.palette.common.white,
  padding: '6px 12px',
  ':hover': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
  },
  ':disabled': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
  },
  ':active': {
    backgroundColor: 'transparent',
  },
}));

const CircularProgress = styled(MuiCircularProgress)(({ theme }) => ({
  color: theme.palette.common.white,
}));

interface LogoutButtonProps {
  sx?: SxProps<Theme>;
}

const LogoutButton: FC<LogoutButtonProps> = ({ sx }) => {
  const [loading, setLoading] = useState(false);
  const { id, logout } = useAuth();

  const logUserOut = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      logout();
      await logoutApi(id);
    } catch (error) {
      /** */
    }
  }, [id, logout]);

  return (
    <LoadingButton
      variant="text"
      onClick={logUserOut}
      loading={loading}
      loadingIndicator={<CircularProgress size={18} />}
      sx={sx}
    >
      Log out
    </LoadingButton>
  );
};

export default LogoutButton;
