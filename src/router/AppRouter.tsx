import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from 'store/auth/hooks';
import ScrollToTop from './ScrollToTop';
import { publicRoutes, privateRoutes, renderRoute, privateRoutePaths } from './routes';
import { Login, CreatePassword, ResetPassword, CompleteProfileOne, CompleteProfileTwo } from 'pages';

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
      {privateRoutes.map(renderRoute)}
      <Route path={privateRoutePaths.completeProfileOne} element={<CompleteProfileOne />} />
      <Route path={privateRoutePaths.completeProfileTwo} element={<CompleteProfileTwo />} />
      <Route path="*" element={<Navigate to={privateRoutePaths.home} replace />} />
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
