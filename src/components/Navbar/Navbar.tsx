import { FC } from 'react';
import { Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { PRIVATE_ROUTE_PATHS } from 'core/constants';
import { ReactComponent as HamburguerMenuIcon } from 'assets/icons/hamburguerMenu.svg';
import { ReactComponent as NavLogoIcon } from 'assets/icons/navLogo.svg';
import { ReactComponent as BellNotificationIcon } from 'assets/icons/bellNotification.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { useAuth } from 'store/auth/hooks';
import { AppBar, LeftContainer, RightContainer, IconButton, NavLogoButton, VerticalDivider, Button } from './ui';
import { CustomBreadcrumbs } from './components';
import { LogoutButton } from '../LogoutButton';

interface NavbarProps {
  toggleDrawer: () => void;
}

const Navbar: FC<NavbarProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSuperAdmin } = useAuth();

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <LeftContainer>
          <IconButton onClick={toggleDrawer} sx={{ marginLeft: -0.5, marginRight: 0.5 }} hoverEnabled>
            <HamburguerMenuIcon />
          </IconButton>

          <NavLogoButton onClick={() => navigate(PRIVATE_ROUTE_PATHS.home)}>
            <NavLogoIcon />
          </NavLogoButton>

          <CustomBreadcrumbs />
        </LeftContainer>

        <RightContainer marginRight="10px">
          <IconButton sx={{ padding: 0 }}>
            <SearchIcon />
          </IconButton>

          <VerticalDivider />

          <IconButton sx={{ padding: 0 }}>
            <BellNotificationIcon />
          </IconButton>

          {/* <AvatarContainer>
              <UserAvatarIcon />
            </AvatarContainer>

            <DropdownMenu textMarginRight={10} active>
              <Typography variant="p14">John Doe</Typography>
            </DropdownMenu> */}

          {isSuperAdmin && !pathname.includes(PRIVATE_ROUTE_PATHS.myAccount) && (
            <Button onClick={() => navigate(PRIVATE_ROUTE_PATHS.myAccount)} sx={{ marginLeft: 2 }}>
              My account
            </Button>
          )}

          <LogoutButton sx={{ marginLeft: 1, marginRight: -1 }} />
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
