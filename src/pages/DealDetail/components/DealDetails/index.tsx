import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC } from 'react';
import { AddButton, Container } from './ui';

const DealDetails: FC = () => {
  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <AddButton startIcon={<PlusIcon />}>Add new Deal</AddButton>
      </DropDownPanel>

      <DropDownPanel title={'Contacts'}>
        <AddButton startIcon={<PlusIcon />}>Add new Contact</AddButton>
      </DropDownPanel>
    </Container>
  );
};

export default DealDetails;
