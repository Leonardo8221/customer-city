import { ProductCategory, ProductCurrency, ProductRateChargeType } from 'store/product/types';
import { OptionValue, UserRole } from './types';
import {
  mapUserRoleToLabel,
  mapProductRateChargeTypeToLabel,
  mapProductCategoryToLabel,
  mapProductCurrencyToLabel,
} from './utils';

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

export const WORKERS_NUMBER_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2 to 5', value: '2-5' },
  { label: '6 to 10', value: '6-10' },
  { label: '11 to 25', value: '11-25' },
  { label: '26 to 50', value: '26-50' },
  { label: '51 to 200', value: '51-200' },
  { label: '201 to 1,000', value: '201-1000' },
  { label: '1,001 to 10,000', value: '1001-10000' },
  { label: '10,000 or more', value: '>=10000' },
];

export const WEBSITE_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

export const PRODUCT_RATE_CHARGE_TYPE_OPTIONS = [
  { label: 'Not selected', value: '' },
  ...Object.values(ProductRateChargeType).map((type) => ({
    label: mapProductRateChargeTypeToLabel(type),
    value: type,
  })),
];

export const PRODUCT_CATEGORY_OPTIONS = [
  { label: 'Not selected', value: '' },
  ...Object.values(ProductCategory).map((category) => ({
    label: mapProductCategoryToLabel(category),
    value: category,
  })),
];

export const PRODUCT_CURRENCY_OPTIONS = [
  ...Object.values(ProductCurrency).map((category) => ({
    label: mapProductCurrencyToLabel(category),
    value: category,
  })),
];
