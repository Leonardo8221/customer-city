import { FC } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { ContactActivity, ContactDetails, ContactProperty } from './components';

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
