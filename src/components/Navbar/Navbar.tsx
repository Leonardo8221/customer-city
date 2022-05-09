import { FC, useState, MouseEvent } from 'react';
import { Toolbar, Typography, ListItemText, Box, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as HamburguerMenuIcon } from 'assets/icons/hamburguerMenu.svg';
import { ReactComponent as NavLogoIcon } from 'assets/icons/navLogo.svg';
import { ReactComponent as UserAvatarIcon } from 'assets/icons/userAvatar.svg';
import { ReactComponent as BellNotificationIcon } from 'assets/icons/bellNotification.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as MenuHomeIcon } from 'assets/icons/menuHome.svg';
import { ReactComponent as MenuContactsIcon } from 'assets/icons/menuContacts.svg';
import { ReactComponent as MenuAccountsIcon } from 'assets/icons/menuAccounts.svg';
import { ReactComponent as MenuProductIcon } from 'assets/icons/menuProduct.svg';
import { ReactComponent as MenuFunnelIcon } from 'assets/icons/menuFunnel.svg';
import { ReactComponent as MenuDealIcon } from 'assets/icons/menuDeal.svg';
import { ReactComponent as MenuTowerIcon } from 'assets/icons/menuTower.svg';
import { ReactComponent as MenuIntegrationIcon } from 'assets/icons/menuIntegration.svg';
import { ReactComponent as MenuLightSquareIcon } from 'assets/icons/menuLightSquare.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as OutlineSunIcon } from 'assets/icons/outlineSun.svg';
import { ReactComponent as OutlineMoonIcon } from 'assets/icons/outlineMoon.svg';
import { privateRoutes } from 'router/routes';
import { NavRoute } from 'router/types';
import {
  AppBar,
  LeftContainer,
  RightContainer,
  IconButton,
  NavLogoButton,
  AvatarContainer,
  VerticalDivider,
  Drawer,
  ListItem,
  ListItemIcon,
  ToggleButtonGroup,
  ToggleButton,
  BottomContainer,
  ThemeIcon,
} from './ui';
import { CustomBreadcrumbs } from './components';
import { Dropdown } from './components/Dropdown';

const routeList: NavRoute[] = [
  { name: 'Home', path: '/', Icon: <MenuHomeIcon /> },
  { name: 'CitizenID', path: '/', Icon: <MenuContactsIcon /> },
  { name: 'Accounts', path: '/', Icon: <MenuAccountsIcon /> },
  { name: 'Product Definer', path: '/', Icon: <MenuProductIcon /> },
  { name: 'Hyper Funnel', path: '/', Icon: <MenuFunnelIcon /> },
  { name: 'Deal Scape', path: '/', Icon: <MenuDealIcon /> },
  { name: 'Control Tower', path: '/', Icon: <MenuTowerIcon /> },
  { name: 'Integration', path: '/', Icon: <MenuIntegrationIcon /> },
  {
    name: 'LightSquare',
    path: '/',
    Icon: <MenuLightSquareIcon />,
    nestedRoutes: [
      { name: 'Dashboard', path: '/' },
      { name: 'Goals and Milestones', path: '/' },
      { name: 'Forecast', path: '/' },
      { name: 'Revenue Simulation', path: '/' },
    ],
  },
];

const Navbar: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('light');
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  // const { isSuperAdmin } = useAuth();

  const toggleDrawer = () => setDrawerOpen((prevState) => !prevState);

  const handleChange = (event: MouseEvent<HTMLElement>, selectedTheme: string) => {
    setActiveTheme(selectedTheme);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <LeftContainer>
            <IconButton>
              <HamburguerMenuIcon onClick={toggleDrawer} />
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

      <Drawer variant="temporary" open={drawerOpen} onClose={toggleDrawer}>
        <Box flex="1">
          <List>
            {routeList.map((route) => (
              <ListItem key={route.name}>
                <ListItemIcon>{route.Icon}</ListItemIcon>
                <ListItemText primary={route.name} primaryTypographyProps={{ variant: 'labelMedium14' }} />
              </ListItem>
            ))}
          </List>
        </Box>

        <BottomContainer>
          <List>
            <ListItem>
              <ListItemIcon>
                <DotsIcon />
              </ListItemIcon>
              <ListItemText primary="More" primaryTypographyProps={{ variant: 'p12' }} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'p12' }} />
            </ListItem>
          </List>

          <ToggleButtonGroup color="primary" value={activeTheme} exclusive onChange={handleChange}>
            <ToggleButton value="light">
              <ThemeIcon>
                <OutlineSunIcon />
              </ThemeIcon>
              Light
            </ToggleButton>
            <ToggleButton value="dark">
              <ThemeIcon>
                <OutlineMoonIcon />
              </ThemeIcon>
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </BottomContainer>
      </Drawer>
    </>
  );
};

export default Navbar;
