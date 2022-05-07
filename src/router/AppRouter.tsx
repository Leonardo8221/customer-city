import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from 'store/auth/hooks';
import ScrollToTop from './ScrollToTop';
import { publicRoutes, privateRoutes } from './routes';
import { Dashboard, Login, Account, CreateCompany, CreatePassword, ResetPassword } from 'pages';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path={publicRoutes.login} element={<Login />} />
      <Route path={publicRoutes.resetPassword} element={<ResetPassword />} />
      <Route path={publicRoutes.createPassword}>
        <Route index element={<CreatePassword />} />
        <Route path=":token" element={<CreatePassword />} />
      </Route>
      <Route path="*" element={<Navigate to={publicRoutes.login} replace />} />
    </Routes>
  );
};

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path={privateRoutes.dashboard} element={<Dashboard />} />
      <Route path={privateRoutes.account} element={<Account />} />
      <Route path={privateRoutes.createCompany} element={<CreateCompany />} />
      <Route path="*" element={<Navigate to={privateRoutes.dashboard} replace />} />
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
