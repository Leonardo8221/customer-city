import { FC } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { AccountActivity, AccountDetails, AccountProperty } from './components';

const AccountDetailPage: FC = () => {
  const { id: accountId } = useParams();

  return (
    <Container>
      <AccountProperty accountId={Number(accountId)} />

      <AccountActivity />

      <AccountDetails />
    </Container>
  );
};

export default AccountDetailPage;
