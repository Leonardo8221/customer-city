import { Container } from '@mui/material';
import { FC, useEffect } from 'react';
import { useIntegration } from 'store/integration/hooks';

const IntegrationRedirectPage: FC = () => {
  const { authCallback, success } = useIntegration();

  const close = () => {
    window.close();
  };

  const params = window.location.search;
  useEffect(() => {
    // get the URL parameters which will include the auth token
    console.log('AUTH PARAMS =====================', params);
    console.log('WINDOW OPENER =====================', window.opener);
    if (params) {
      authCallback(String(params));
    }
  }, []);

  useEffect(() => {
    if (success) {
      window.close();
    }
  }, [success]);

  return (
    <Container maxWidth="lg">
      <h1 onClick={close}>Installing please wait ...</h1>
    </Container>
  );
};

export default IntegrationRedirectPage;
