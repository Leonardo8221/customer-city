import { FC, useEffect } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { ContactActivity, ContactDetails, ContactProperty } from './components';
import { useIntegration } from 'store/integration/hooks';

const ContactDetailPage: FC = () => {
  const { id: contactId } = useParams();
  const { integration, getIntegration } = useIntegration();

  useEffect(() => {
    getIntegration('gmail');
  }, []);

  return (
    <Container>
      <ContactProperty contactId={Number(contactId)} />

      <ContactActivity />

      <ContactDetails />
    </Container>
  );
};

export default ContactDetailPage;
