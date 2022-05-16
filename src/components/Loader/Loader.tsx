import { FC } from 'react';
import { CircularProgress } from '@mui/material';

import { Container } from './ui';

const Loader: FC = () => {
  return (
    <Container>
      <CircularProgress size={50} />
    </Container>
  );
};

export default Loader;
