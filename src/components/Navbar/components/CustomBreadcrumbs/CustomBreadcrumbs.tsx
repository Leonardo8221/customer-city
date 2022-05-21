import { FC } from 'react';
import { Breadcrumbs } from '@mui/material';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { dashboardRoutes } from 'router/routes';
import { mapAbsRoutePathToLabel } from 'core/utils';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { Container, Link, Separator } from './ui';
import { DropdownMenu } from '../DropdownMenu';

const CustomBreadcrumbs: FC = () => {
  const breadcrumbs = useBreadcrumbs(dashboardRoutes);
  const navigate = useNavigate();

  return (
    <Container>
      <Breadcrumbs
        separator={
          <Separator>
            <ChevronRightIcon />
          </Separator>
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs.slice(1).map((breadcrumb) => {
          const path = breadcrumb.key;
          const label = mapAbsRoutePathToLabel(breadcrumb.key);
          const pathname = breadcrumb.location.pathname;
          const active = path === pathname;

          if (path === PRIVATE_ABS_ROUTE_PATHS.lightSquare) {
            return (
              <DropdownMenu
                key={path}
                label={label}
                active={active}
                items={[
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.dashboard),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.dashboard),
                    active: PRIVATE_ABS_ROUTE_PATHS.dashboard === pathname,
                  },
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.goalsMilestones),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.goalsMilestones),
                    active: PRIVATE_ABS_ROUTE_PATHS.goalsMilestones === pathname,
                  },
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.forecast),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.forecast),
                    active: PRIVATE_ABS_ROUTE_PATHS.forecast === pathname,
                  },
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.revenueSimulation),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.revenueSimulation),
                    active: PRIVATE_ABS_ROUTE_PATHS.revenueSimulation === pathname,
                  },
                ]}
              />
            );
          }

          return (
            <Link key={path} onClick={() => navigate(path)} active={active}>
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
};

export default CustomBreadcrumbs;
