import { FC } from 'react';
import { Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { privateRoutes } from 'router/routes';
import { AppBar, LeftContainer, RightContainer, Button } from './ui';
import { LogoutButton } from 'components/LogoutButton';
import { useAuth } from 'store/auth/hooks';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSuperAdmin } = useAuth();

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <LeftContainer>
          <Button onClick={() => navigate(privateRoutes.dashboard)}>Home</Button>
        </LeftContainer>

        <RightContainer>
          <LogoutButton />

          {isSuperAdmin && pathname !== privateRoutes.account && (
            <Button onClick={() => navigate(privateRoutes.account)}>My account</Button>
          )}
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
