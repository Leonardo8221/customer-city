import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from 'components/Navbar';
import { Container } from './ui';

const PanelLayout: FC = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default PanelLayout;
