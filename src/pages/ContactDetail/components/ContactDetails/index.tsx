import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC, useEffect, useMemo, useState } from 'react';
import { Container } from './ui';
import { AccountItem, DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';
import { useContact } from 'store/contact/hooks';
import { AccountContact, createAccountContact, getAccountsByContactId } from 'http/account/accountContact';
import AccountRelationModal from '../AccountRelationModal/AccountRelationModal';
import { CustomSelect } from 'components/CustomSelect';
import { useAccount } from 'store/account/hooks';
import { OptionValue } from 'core/types';
import { Contact } from 'store/contact/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';

const ContactDetails: FC = () => {
  const { contact, updateContact } = useContact();
  const { accounts, getAccounts } = useAccount();
  const [openAddAccount, setOpenAddAccount] = useState<boolean>(false);
  const [accountContacts, setAccountContacts] = useState<AccountContact[]>([]);

  useEffect(() => {
    getAccounts();
  }, [contact]);

  const suggestions: OptionValue<number>[] = useMemo(() => {
    return accounts.map((acc, val) => {
      return { label: acc.accountName, value: acc.accountId };
    });
  }, [accounts]);

  const handleUpdate = (data: Partial<Contact>) => {
    contact && updateContact({ contactId: contact.contactId, data });
  };

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
        <TitleContainer label="Account Name" icon="user">
          <CustomSelect<number>
            value={contact?.accountId ?? 0}
            options={suggestions}
            onSelect={async (value) => handleUpdate({ accountId: value })}
          />
        </TitleContainer>
      </DropDownPanel>
    </Container>
  );
};

export default ContactDetails;
