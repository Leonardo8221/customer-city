import { FC, ReactNode } from 'react';

import { Navbar } from 'components/Navbar';
import { Container } from './ui';

interface LayoutProps {
  children: ReactNode;
}

const PanelLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Navbar />

      {children}
    </Container>
  );
};

export default PanelLayout;
