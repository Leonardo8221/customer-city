import { FC } from 'react';
import { Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { ReactComponent as HamburguerMenuIcon } from 'assets/icons/hamburguerMenu.svg';
import { ReactComponent as NavLogoIcon } from 'assets/icons/navLogo.svg';
import { privateRoutes } from 'router/routes';
import { LogoutButton } from 'components/LogoutButton';
import { useAuth } from 'store/auth/hooks';
import { AppBar, LeftContainer, RightContainer, Button, IconButton, NavLogoButton } from './ui';
import { CustomBreadcrumbs } from './components';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSuperAdmin } = useAuth();

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <LeftContainer>
          <IconButton>
            <HamburguerMenuIcon />
          </IconButton>

          <NavLogoButton onClick={() => navigate(privateRoutes.dashboard)}>
            <NavLogoIcon />
          </NavLogoButton>

          <CustomBreadcrumbs />
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
