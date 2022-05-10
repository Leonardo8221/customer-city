import { Container } from '@mui/material';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const DummyPage: FC = () => {
  const { pathname } = useLocation();

  return (
    <Container maxWidth="lg">
      <h1>{pathname}</h1>
    </Container>
  );
};

export default DummyPage;
