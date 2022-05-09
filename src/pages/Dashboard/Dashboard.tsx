import { FC } from 'react';

import { useAuth } from 'store/auth/hooks';
import { SuperAdmin } from './components/SuperAdmin';
import { Admin } from './components/Admin';
import { PanelLayout } from 'components/PanelLayout';

const Dashboard: FC = () => {
  const { isSuperAdmin } = useAuth();

  return <PanelLayout>{isSuperAdmin ? <SuperAdmin /> : <Admin />}</PanelLayout>;
};

export default Dashboard;
