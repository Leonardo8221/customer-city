import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const DummyPage: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <h1>{pathname}</h1>
    </>
  );
};

export default DummyPage;
