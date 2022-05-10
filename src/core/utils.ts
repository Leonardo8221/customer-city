import { PRIVATE_ABS_ROUTE_PATHS } from './constants';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};

export const validatePassword = (password?: string) => {
  if (!password) return false;
  return (
    password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[^a-zA-Z0-9]|\s|\d/.test(password)
  );
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const mapAbsRoutePathToLabel = (path: string): string => {
  switch (path) {
    case PRIVATE_ABS_ROUTE_PATHS.citizenId:
      return 'CitizenID';
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
