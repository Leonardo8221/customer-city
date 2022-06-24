import { Divider, Typography } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { FC } from 'react';
import { ContactContainer } from './ui';

const ContactItem: FC = () => {
  return (
    <>
      <ContactContainer>
        <TitleContainer label="Contact Name" icon="user">
          <CustomSelect<string> value={'Olivia'} options={[{ label: 'Olivia Piterson', value: 'Olivia' }]} />
        </TitleContainer>
        <TitleContainer label="Work email">
          <Typography variant="p14">{'olivia.piterson@gmail.com'}</Typography>
        </TitleContainer>
        <TitleContainer label="Phone number" icon="phone">
          <Typography variant="p14">{'+4 123 345 244'}</Typography>
        </TitleContainer>
      </ContactContainer>
      <Divider />
    </>
  );
};

export default ContactItem;
