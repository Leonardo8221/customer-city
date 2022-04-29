import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuth } from 'store/auth/hooks';
import ScrollToTop from './ScrollToTop';
import { publicRoutes, privateRoutes } from './routes';
import { Dashboard, Login } from 'pages';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path={publicRoutes.login} element={<Login />} />
    </Routes>
  );
};

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path={privateRoutes.dashboard} element={<Dashboard />} />
    </Routes>
  );
};

const AppRouter: FC = () => {
  const { accessToken } = useAuth();

  return (
    <Router>
      <ScrollToTop />

      {accessToken ? <PrivateRoutes /> : <PublicRoutes />}
    </Router>
  );
};

export default AppRouter;
