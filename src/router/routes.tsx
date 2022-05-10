import { Route } from 'react-router-dom';

import { PanelLayout } from 'components/PanelLayout';
import { Account, CreateCompany, Dashboard } from 'pages';
import DummyPage from './DummyPage';

export const publicRoutes = {
  login: '/auth/login',
  createPassword: '/auth/create-password',
  resetPassword: '/auth/reset-password',
};

export const privateRoutePaths = {
  home: 'd',
  myAccount: 'my-account',
  createCompany: 'create-company',
  citizenId: 'citizen-id',
  accounts: 'accounts',
  productDefiner: 'product-definer',
  hyperFunnel: 'hyper-funnel',
  dealScape: 'deal-scape',
  controlTower: 'control-tower',
  integration: 'integration',
  lightSquare: 'light-square',
  goalsAndMilestones: 'goals-milestones',
  forecast: 'forecast',
  revenueSimulation: 'revenue-simulation',
};

interface AppRoute {
  path?: string;
  index?: boolean;
  element?: JSX.Element;
  nestedRoutes?: AppRoute[];
}

export const privateRoutes: AppRoute[] = [
  {
    path: privateRoutePaths.home,
    element: <PanelLayout />,
    nestedRoutes: [
      { index: true, element: <Dashboard /> },
      { path: privateRoutePaths.myAccount, element: <Account /> },
      { path: privateRoutePaths.createCompany, element: <CreateCompany /> },
      { path: privateRoutePaths.citizenId, element: <DummyPage /> },
      { path: privateRoutePaths.accounts, element: <DummyPage /> },
      { path: privateRoutePaths.productDefiner, element: <DummyPage /> },
      { path: privateRoutePaths.hyperFunnel, element: <DummyPage /> },
      { path: privateRoutePaths.dealScape, element: <DummyPage /> },
      { path: privateRoutePaths.controlTower, element: <DummyPage /> },
      { path: privateRoutePaths.integration, element: <DummyPage /> },
      {
        path: privateRoutePaths.lightSquare,
        element: <DummyPage />,
        nestedRoutes: [
          { index: true, element: <DummyPage /> },
          { path: privateRoutePaths.goalsAndMilestones, element: <DummyPage /> },
          { path: privateRoutePaths.forecast, element: <DummyPage /> },
          { path: privateRoutePaths.revenueSimulation, element: <DummyPage /> },
        ],
      },
    ],
  },
];

export const renderRoute = ({ nestedRoutes, ...route }: AppRoute, idx: number) => {
  if (!nestedRoutes?.length) return <Route key={`${route.path}+${idx}`} {...route} />;

  return (
    <Route key={`${route.path}+${idx}`} {...route}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {nestedRoutes.map(renderRoute)}
    </Route>
  );
};
