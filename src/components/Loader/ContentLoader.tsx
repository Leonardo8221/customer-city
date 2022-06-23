import { FC } from 'react';
import { CircularProgress } from '@mui/material';

import { ContentLoadContainer } from './ui';

const ContentLoader: FC = () => {
  return (
    <ContentLoadContainer>
      <CircularProgress size={50} />
    </ContentLoadContainer>
  );
};

export default ContentLoader;
