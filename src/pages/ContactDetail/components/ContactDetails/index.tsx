import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC, useEffect, useState } from 'react';
import { Container } from './ui';
import { AccountItem, DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';
import { useContact } from 'store/contact/hooks';
import { AccountContact, createAccountContact, getAccountsByContactId } from 'http/account/accountContact';
import AccountRelationModal from '../AccountRelationModal/AccountRelationModal';

const ContactDetails: FC = () => {
  const { contact } = useContact();
  const [openAddAccount, setOpenAddAccount] = useState<boolean>(false);
  const [accountContacts, setAccountContacts] = useState<AccountContact[]>([]);

  const getAccountByContact = () => {
    if (!contact) return;
    getAccountsByContactId(contact.contactId).then((res: AccountContact[]) => setAccountContacts(res));
  };

  useEffect(getAccountByContact, [contact]);

  const toggleModal = () => {
    setOpenAddAccount((prevState: boolean) => !prevState);
  };

  const handleAddAccount = (id: number) => {
    createAccountContact({ accountId: id, contactId: contact?.contactId }).then((res) => {
      getAccountByContact();
    });
    toggleModal();
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
        {accountContacts.map((accountContact) => (
          <AccountItem key={accountContact.accountContactId} item={accountContact} />
        ))}

        <CustomIconButton startIcon={<PlusIcon />} onClick={() => toggleModal()}>
          Add Account
        </CustomIconButton>
      </DropDownPanel>
      <AccountRelationModal open={openAddAccount} toggleOpen={() => toggleModal()} onSelect={handleAddAccount} />
    </Container>
  );
};

export default ContactDetails;
