import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC } from 'react';
import { Container } from './ui';
import { AccountItem, DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';

const ContactDetails: FC = () => {
  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <DealItem />
        <DealItem />
        <CustomIconButton startIcon={<PlusIcon />}>Add Deal</CustomIconButton>
      </DropDownPanel>

      <DropDownPanel title={'Account Relation'}>
        <AccountItem />
        <AccountItem />
        <AccountItem />
        <CustomIconButton startIcon={<PlusIcon />}>Add Account</CustomIconButton>
      </DropDownPanel>
    </Container>
  );
};

export default ContactDetails;
