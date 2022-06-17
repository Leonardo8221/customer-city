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

      <DropDownPanel title={'Contact Source'}></DropDownPanel>

      <DropDownPanel title={'Deals Connection'}>
        <AddButton startIcon={<PlusIcon />}>Add Deal</AddButton>
      </DropDownPanel>

      <DropDownPanel title={'Account Relation'}>
        <AddButton startIcon={<PlusIcon />}>Add Account</AddButton>
      </DropDownPanel>

      <DropDownPanel title={'Influence Level'}></DropDownPanel>
      <DropDownPanel title={'Motivations and Objections'}></DropDownPanel>
      <DropDownPanel title={'Engagement Score'}></DropDownPanel>
      <DropDownPanel title={'Contact Connections'}></DropDownPanel>
      <DropDownPanel title={'Sentiment and Interests'}></DropDownPanel>
      <DropDownPanel title={'Similar Audience'}></DropDownPanel>
    </Container>
  );
};

export default ContactDetails;
