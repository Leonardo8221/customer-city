import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIntegration } from 'store/integration/hooks';
import { ContactActivity, ContactDetails, ContactProperty } from './components';
import { Container } from './ui';

const ContactDetailPage: FC = () => {
  const { id: contactId } = useParams();

  return (
    <Container>
      <ContactProperty contactId={Number(contactId)} />

      <ContactActivity />

      <ContactDetails />
    </Container>
  );
};

export default ContactDetailPage;
