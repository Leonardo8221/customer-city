import { FC, useState, MouseEvent } from 'react';
import { ListItemText, List } from '@mui/material';

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
import { NavRoute } from 'router/types';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ToggleButtonGroup,
  ToggleButton,
  ThemeIcon,
  BottomContainer,
  MainListContainer,
} from './ui';
import { MenuItem } from './components';

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

interface DrawerComponentProps {
  open: boolean;
  toggleOpen: () => void;
}

const DrawerComponent: FC<DrawerComponentProps> = ({ open, toggleOpen }) => {
  const [activeTheme, setActiveTheme] = useState('light');

  const handleChange = (event: MouseEvent<HTMLElement>, selectedTheme: string) => {
    setActiveTheme(selectedTheme);
  };

  return (
    <Drawer variant="temporary" open={open} onClose={toggleOpen}>
      <MainListContainer className="no-scrollbar">
        <List>
          {routeList.map((route) => (
            <MenuItem key={route.name} Icon={route.Icon} label={route.name} nestedItems={route.nestedRoutes} />
          ))}
        </List>
      </MainListContainer>

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
  );
};

export default DrawerComponent;
