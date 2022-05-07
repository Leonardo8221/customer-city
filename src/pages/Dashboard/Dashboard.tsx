import { FC } from 'react';

import { useAuth } from 'store/auth/hooks';
import { SuperAdmin } from './components/SuperAdmin';
import { Admin } from './components/Admin';
import { Layout } from 'components/Layout';

const Dashboard: FC = () => {
  const { isSuperAdmin } = useAuth();

  return <Layout>{isSuperAdmin ? <SuperAdmin /> : <Admin />}</Layout>;
};

export default Dashboard;
