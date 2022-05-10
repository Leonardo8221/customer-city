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
  { name: 'Home', path: '/d', Icon: <MenuHomeIcon /> },
  { name: 'CitizenID', path: '/d/citizen-id', Icon: <MenuContactsIcon /> },
  { name: 'Accounts', path: '/d/accounts', Icon: <MenuAccountsIcon className="path-fill" /> },
  { name: 'Product Definer', path: '/d/product-definer', Icon: <MenuProductIcon />, notifications: 1 },
  { name: 'Hyper Funnel', path: '/d/hyper-funnel', Icon: <MenuFunnelIcon />, notifications: 1 },
  { name: 'Deal Scape', path: '/d/deal-scape', Icon: <MenuDealIcon /> },
  { name: 'Control Tower', path: '/d/control-tower', Icon: <MenuTowerIcon /> },
  { name: 'Integration', path: '/d/integration', Icon: <MenuIntegrationIcon /> },
  {
    name: 'LightSquare',
    path: '/d/light-square',
    Icon: <MenuLightSquareIcon />,
    nestedRoutes: [
      { name: 'Dashboard', path: '/d/light-square' },
      { name: 'Goals and Milestones', path: '/d/light-square/goals-milestones' },
      { name: 'Forecast', path: '/d/light-square/forecast' },
      { name: 'Revenue Simulation', path: '/d/light-square/revenue-simulation' },
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
            <MenuItem
              key={route.name}
              Icon={route.Icon}
              label={route.name}
              nestedItems={route.nestedRoutes}
              notifications={route.notifications}
              path={route.path}
            />
          ))}
        </List>
      </MainListContainer>

      <BottomContainer paddingTop={1}>
        <List>
          <ListItem nested>
            <ListItemIcon>
              <DotsIcon />
            </ListItemIcon>
            <ListItemText primary="More" primaryTypographyProps={{ variant: 'p12' }} />
          </ListItem>

          <ListItem nested>
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
