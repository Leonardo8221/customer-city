import { FC, useState } from 'react';
import { Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as HamburguerMenuIcon } from 'assets/icons/hamburguerMenu.svg';
import { ReactComponent as NavLogoIcon } from 'assets/icons/navLogo.svg';
import { ReactComponent as BellNotificationIcon } from 'assets/icons/bellNotification.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { privateRoutes } from 'router/routes';
import { useAuth } from 'store/auth/hooks';
import { AppBar, LeftContainer, RightContainer, IconButton, NavLogoButton, VerticalDivider, Button } from './ui';
import { CustomBreadcrumbs } from './components';
import { Drawer } from '../Drawer';
import { LogoutButton } from '../LogoutButton';

const Navbar: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSuperAdmin } = useAuth();

  const toggleDrawer = () => setDrawerOpen((prevState) => !prevState);

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <LeftContainer>
            <IconButton onClick={toggleDrawer} sx={{ marginLeft: -0.5, marginRight: 0.5 }} hoverEnabled>
              <HamburguerMenuIcon />
            </IconButton>

            <NavLogoButton onClick={() => navigate(privateRoutes.dashboard)}>
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

            {isSuperAdmin && pathname !== privateRoutes.account && (
              <Button onClick={() => navigate(privateRoutes.account)}>My account</Button>
            )}

            <LogoutButton />
          </RightContainer>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} toggleOpen={toggleDrawer} />
    </>
  );
};

export default Navbar;
