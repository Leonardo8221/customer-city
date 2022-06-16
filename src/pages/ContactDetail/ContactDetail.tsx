import { FC, useEffect } from 'react';
import { Typography } from '@mui/material';

import { useContact } from 'store/contact/hooks';
import { Loader } from 'components/Loader';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { ContactActivity, ContactDetails, ContactProfile } from './components';

const ContactDetailPage: FC = () => {
  const { id: contactId } = useParams();

  const { loading, error, contact, getContact } = useContact();

  useEffect(() => {
    getContact(Number(contactId));
  }, [contactId, getContact]);

  if (loading) return <Loader />;

  return (
    <Container>
      <ContactProfile contact={contact} />

      <ContactActivity />

      <ContactDetails />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}
    </Container>
  );
};

export default ContactDetailPage;
