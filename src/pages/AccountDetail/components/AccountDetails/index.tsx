import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC } from 'react';
import { Container } from './ui';
import { ContactItem, DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';

const AccountDetails: FC = () => {
  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <DealItem />
        <DealItem />
        <CustomIconButton startIcon={<PlusIcon />}>Add new Deal</CustomIconButton>
      </DropDownPanel>

      <DropDownPanel title={'Contacts'}>
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <CustomIconButton startIcon={<PlusIcon />}>Add new Contact</CustomIconButton>
      </DropDownPanel>
    </Container>
  );
};

export default AccountDetails;
