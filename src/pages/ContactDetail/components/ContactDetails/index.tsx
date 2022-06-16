import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC } from 'react';
import { AddButton, Container } from './ui';

const ContactDetails: FC = () => {
  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <AddButton startIcon={<PlusIcon />}>Add Deal</AddButton>
      </DropDownPanel>

      <DropDownPanel title={'Account Relation'}>
        <AddButton startIcon={<PlusIcon />}>Add Account</AddButton>
      </DropDownPanel>
    </Container>
  );
};

export default ContactDetails;
