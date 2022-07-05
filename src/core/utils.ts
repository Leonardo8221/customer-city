import { ProductCategory, ProductCurrency } from 'store/product/types';
import { ProductRateChargeType } from 'store/product/types';
import { PRIVATE_ABS_ROUTE_PATHS } from './constants';
import { UserRole } from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};

export const validatePassword = (password?: string) => {
  if (!password) return false;
  return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[^a-zA-Z\s]/.test(password);
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const mapAbsRoutePathToLabel = (path: string): string => {
  switch (path) {
    case PRIVATE_ABS_ROUTE_PATHS.contacts:
      return 'Contacts';
    case PRIVATE_ABS_ROUTE_PATHS.accounts:
      return 'Accounts';
    case PRIVATE_ABS_ROUTE_PATHS.productDefiner:
      return 'Product Definer';
    case PRIVATE_ABS_ROUTE_PATHS.hyperFunnel:
      return 'Hyper Funnel';
    case PRIVATE_ABS_ROUTE_PATHS.dealScape:
      return 'Deal Scape';
    case PRIVATE_ABS_ROUTE_PATHS.controlTower:
      return 'Control Tower';
    case PRIVATE_ABS_ROUTE_PATHS.integration:
      return 'Integration';
    case PRIVATE_ABS_ROUTE_PATHS.lightSquare:
      return 'Light Square';
    case PRIVATE_ABS_ROUTE_PATHS.dashboard:
      return 'Dashboard';
    case PRIVATE_ABS_ROUTE_PATHS.goalsMilestones:
      return 'Goals and Milestoned';
    case PRIVATE_ABS_ROUTE_PATHS.forecast:
      return 'Forecast';
    case PRIVATE_ABS_ROUTE_PATHS.revenueSimulation:
      return 'Revenue Simulation';
    case PRIVATE_ABS_ROUTE_PATHS.settings:
      return 'Settings';
    case PRIVATE_ABS_ROUTE_PATHS.more:
      return 'More';
    case PRIVATE_ABS_ROUTE_PATHS.myAccount:
      return 'My Account';
    case PRIVATE_ABS_ROUTE_PATHS.createCompany:
      return 'Create Company';
    default:
      return 'Home';
  }
};

export const mapUserRoleToLabel = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator';
    case UserRole.OWNER:
      return 'Owner';
    case UserRole.USER:
      return 'Business User';
    default:
      return 'Super Admin';
  }
};

export const mapLabelToUserRole = (label: string): UserRole => {
  switch (label) {
    case 'Administrator':
      return UserRole.ADMIN;
    case 'Owner':
      return UserRole.OWNER;
    case 'Business User':
      return UserRole.USER;
    default:
      return UserRole.SUPER_AMIN;
  }
};

export const mapProductCategoryToLabel = (category: ProductCategory): string => {
  switch (category) {
    case ProductCategory.BASE_PRODUCT:
      return 'Base Product';
    case ProductCategory.ADD_ON:
      return 'Add On';
    case ProductCategory.MISC_PRODUCT:
      return 'Misc Product';
    default:
      return 'Unknown Category';
  }
};

export const mapLabelToProductCategory = (label: string): ProductCategory => {
  switch (label) {
    case 'Base Product':
      return ProductCategory.BASE_PRODUCT;
    case 'Add On':
      return ProductCategory.ADD_ON;
    case 'Misc Product':
      return ProductCategory.MISC_PRODUCT;
    default:
      return ProductCategory.BASE_PRODUCT;
  }
};

export const mapProductRateChargeTypeToLabel = (category: ProductRateChargeType): string => {
  switch (category) {
    case ProductRateChargeType.ONE_TIME:
      return 'One time';
    case ProductRateChargeType.RECURRING:
      return 'Recurring';
    case ProductRateChargeType.USAGE:
      return 'Usage';
    default:
      return 'Unknown Rate Charge Type';
  }
};

export const mapLabelToProductRateChargeType = (label: string): ProductRateChargeType => {
  switch (label) {
    case 'One time':
      return ProductRateChargeType.ONE_TIME;
    case 'Recurring':
      return ProductRateChargeType.RECURRING;
    case 'Usage':
      return ProductRateChargeType.USAGE;
    default:
      return ProductRateChargeType.ONE_TIME;
  }
};

export const mapProductCurrencyToLabel = (category: ProductCurrency): string => {
  switch (category) {
    case ProductCurrency.USD:
      return '$ USD (US Dollar)';
    default:
      return 'Unknown Currency';
  }
};

export const mapLabelToProductCurrency = (label: string): ProductCurrency => {
  switch (label) {
    case '$ USD (US Dollar)':
      return ProductCurrency.USD;
    default:
      return ProductCurrency.USD;
  }
};

export const humanFileSize = (bytes: number, si = true, dp = 1): string => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + ' ' + units[u];
};
