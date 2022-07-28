import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC, useEffect, useState } from 'react';
import { Container } from './ui';
import { ContactItem, DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';
import { AccountContact, createAccountContact, getContactsByAccountId } from 'http/account/accountContact';
import { useAccount } from 'store/account/hooks';
import ContactRelationModal from '../ContactRelationModal/ContactRelationModal';
import { Contact } from 'store/contact/types';

const AccountDetails: FC = () => {
  const { account } = useAccount();
  const [openAddContact, setOpenAddContact] = useState<boolean>(false);
  const [accountContacts, setAccountContacts] = useState<AccountContact[]>([]);

  useEffect(() => {
    if (!account) return;
    getContactsByAccountId(account.accountId).then((res: AccountContact[]) => setAccountContacts(res));
  }, [account]);

  const toggleModal = () => {
    setOpenAddContact((prevState: boolean) => !prevState);
  };

  const handleAddContact = (id: number) => {
    createAccountContact({ accountId: account?.accountId, contactId: id });
    toggleModal();
  };
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
        {accountContacts.map((accountContact) => (
          <ContactItem key={accountContact.accountContactId} item={accountContact} />
        ))}
        <CustomIconButton startIcon={<PlusIcon />} onClick={() => toggleModal()}>
          Add new Contact
        </CustomIconButton>
      </DropDownPanel>
      <ContactRelationModal open={openAddContact} toggleOpen={() => toggleModal()} onSelect={handleAddContact} />
    </Container>
  );
};

export default AccountDetails;
