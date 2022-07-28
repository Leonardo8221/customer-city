import { Divider, Typography } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { AccountContact } from 'http/account/accountContact';
import { FC } from 'react';
import { ContactContainer } from './ui';

interface ContactItemProps {
  item: AccountContact;
}

const ContactItem: FC<ContactItemProps> = ({ item }) => {
  const contact = item.contact;
  return (
    <>
      <ContactContainer>
        <TitleContainer label="Contact Name" icon="user">
          <CustomSelect<number>
            value={contact?.contactId ?? 0}
            options={[{ label: `${contact?.firstName} ${contact?.lastName}`, value: contact?.contactId ?? 0 }]}
          />
        </TitleContainer>
        <TitleContainer label="Work email">
          <Typography variant="p14">{contact?.contactInfo?.email ?? '-'}</Typography>
        </TitleContainer>
        <TitleContainer label="Phone number" icon="phone">
          <Typography variant="p14">{contact?.contactInfo?.phoneNumber ?? '-'}</Typography>
        </TitleContainer>
      </ContactContainer>
      <Divider />
    </>
  );
};

export default ContactItem;
