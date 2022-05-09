import { FC } from 'react';
import { Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as HamburguerMenuIcon } from 'assets/icons/hamburguerMenu.svg';
import { ReactComponent as NavLogoIcon } from 'assets/icons/navLogo.svg';
import { ReactComponent as UserAvatarIcon } from 'assets/icons/userAvatar.svg';
import { ReactComponent as BellNotificationIcon } from 'assets/icons/bellNotification.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { privateRoutes } from 'router/routes';
import {
  AppBar,
  LeftContainer,
  RightContainer,
  IconButton,
  NavLogoButton,
  AvatarContainer,
  VerticalDivider,
} from './ui';
import { CustomBreadcrumbs } from './components';
import { Dropdown } from './components/Dropdown';

const Navbar: FC = () => {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  // const { isSuperAdmin } = useAuth();

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

        <RightContainer marginRight="10px">
          {/* <LogoutButton />

          {isSuperAdmin && pathname !== privateRoutes.account && (
            <Button onClick={() => navigate(privateRoutes.account)}>My account</Button>
          )} */}
          <IconButton sx={{ padding: 0 }}>
            <SearchIcon />
          </IconButton>

          <VerticalDivider />

          <IconButton sx={{ padding: 0 }}>
            <BellNotificationIcon />
          </IconButton>

          <AvatarContainer>
            <UserAvatarIcon />
          </AvatarContainer>

          <Dropdown textMarginRight={10} active>
            <Typography variant="p14">John Doe</Typography>
          </Dropdown>
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
