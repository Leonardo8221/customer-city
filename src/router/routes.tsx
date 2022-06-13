import { Route } from 'react-router-dom';

import { PRIVATE_ROUTE_PATHS } from 'core/constants';
import { PanelLayout } from 'components/PanelLayout';
import {
  Contact,
  Account,
  CreateCompany,
  Dashboard,
  ControlTower,
  ProductDefiner,
  CompleteProfileOne,
  CompleteProfileTwo,
} from 'pages';
import DummyPage from './DummyPage';

interface AppRoute {
  path?: string;
  index?: boolean;
  element?: JSX.Element;
  nestedRoutes?: AppRoute[];
}

export const dashboardRoutes: AppRoute[] = [
  {
    path: PRIVATE_ROUTE_PATHS.home,
    element: <PanelLayout />,
    nestedRoutes: [
      { index: true, path: PRIVATE_ROUTE_PATHS.home, element: <Dashboard /> },
      { path: PRIVATE_ROUTE_PATHS.contacts, element: <Contact /> },
      { path: PRIVATE_ROUTE_PATHS.accounts, element: <DummyPage /> },
      { path: PRIVATE_ROUTE_PATHS.productDefiner, element: <ProductDefiner /> },
      { path: PRIVATE_ROUTE_PATHS.hyperFunnel, element: <DummyPage /> },
      { path: PRIVATE_ROUTE_PATHS.dealScape, element: <DummyPage /> },
      { path: PRIVATE_ROUTE_PATHS.controlTower, element: <ControlTower /> },
      { path: PRIVATE_ROUTE_PATHS.integration, element: <DummyPage /> },
      {
        path: PRIVATE_ROUTE_PATHS.lightSquare,
        element: <DummyPage />,
        nestedRoutes: [
          { index: true, path: PRIVATE_ROUTE_PATHS.dashboard, element: <DummyPage /> },
          { path: PRIVATE_ROUTE_PATHS.goalsAndMilestones, element: <DummyPage /> },
          { path: PRIVATE_ROUTE_PATHS.forecast, element: <DummyPage /> },
          { path: PRIVATE_ROUTE_PATHS.revenueSimulation, element: <DummyPage /> },
        ],
      },
      { path: PRIVATE_ROUTE_PATHS.myAccount, element: <Account /> },
      { path: PRIVATE_ROUTE_PATHS.createCompany, element: <CreateCompany /> },
      { path: PRIVATE_ROUTE_PATHS.settings, element: <DummyPage /> },
      { path: PRIVATE_ROUTE_PATHS.more, element: <DummyPage /> },
    ],
  },
];

export const profileRoutes = [
  { path: PRIVATE_ROUTE_PATHS.completeProfileOne, element: <CompleteProfileOne /> },
  { path: PRIVATE_ROUTE_PATHS.completeProfileTwo, element: <CompleteProfileTwo /> },
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
