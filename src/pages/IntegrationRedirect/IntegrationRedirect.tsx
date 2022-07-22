import { Container } from '@mui/material';
import { PrimaryButton } from 'components/ui';
import { FC, useEffect } from 'react';

const IntegrationRedirectPage: FC = () => {
  const close = () => {
    window.close();
  };
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const params = window.location.search;
    console.log('AUTH PARAMS =====================', params);
    console.log('WINDOW OPENER =====================', window.opener);

    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage(params);
      // close the popup
      window.close();
    }
  });

  return (
    <Container maxWidth="lg">
      <h1>Installing please wait ...</h1>
      <PrimaryButton onClick={close}>Close</PrimaryButton>
    </Container>
  );
};

export default IntegrationRedirectPage;
