import { FC, useEffect } from 'react';
import { Typography } from '@mui/material';

import { useAccount } from 'store/account/hooks';
import { Loader } from 'components/Loader';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { AccountActivity, AccountDetails, AccountProfile } from './components';

const AccountDetailPage: FC = () => {
  const { id: accountId } = useParams();

  const { loading, error, account, getAccount } = useAccount();

  useEffect(() => {
    getAccount(Number(accountId));
  }, [accountId, getAccount]);

  if (loading) return <Loader />;

  return (
    <Container>
      <AccountProfile account={account} />

      <AccountActivity />

      <AccountDetails />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}
    </Container>
  );
};

export default AccountDetailPage;
