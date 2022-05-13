import { OptionValue, UserRole } from './types';
import { mapUserRoleToLabel } from './utils';

export const AUTH_SESSION_KEY = 'customerCity/AUTH_SESSION_KEY';

export const NAV_BAR_HEIGHT = 56;

export const DRAWER_MENU_WIDTH = 280;

export const DRAWER_MENU_BOTTOM_SECTION_HEIGHT = 160;

export const PRIVATE_ABS_ROUTE_PATHS = {
  home: '/d',
  citizenId: '/d/citizen-id',
  accounts: '/d/accounts',
  productDefiner: '/d/product-definer',
  hyperFunnel: '/d/hyper-funnel',
  dealScape: '/d/deal-scape',
  controlTower: '/d/control-tower',
  integration: '/d/integration',
  lightSquare: '/d/light-square',
  dashboard: '/d/light-square/dashboard',
  goalsMilestones: '/d/light-square/goals-milestones',
  forecast: '/d/light-square/forecast',
  revenueSimulation: '/d/light-square/revenue-simulation',
  //
  createCompany: '/d/create-company',
  myAccount: '/d/my-account',
  settings: '/d/settings',
  more: '/d/more',
};

export const PHONE_REGEX = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const USER_ROLE_OPTIONS = Object.values(UserRole).reduce(
  (acc: OptionValue<UserRole>[], role): OptionValue<UserRole>[] => {
    if (role === UserRole.SUPER_AMIN) return acc;
    return [...acc, { label: mapUserRoleToLabel(role), value: role }];
  },
  [],
);
