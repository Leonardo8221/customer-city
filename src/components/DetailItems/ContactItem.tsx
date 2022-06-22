import { Box, Divider, Typography } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { ReactComponent as AvatarIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { FC } from 'react';
import { ContactContainer } from './ui';

const ContactItem: FC = () => {
  return (
    <>
      <ContactContainer>
        <TitleContainer label="Contact Name">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AvatarIcon />
            <CustomSelect<string>
              value={'Olivia'}
              options={[{ label: 'Olivia Piterson', value: 'Olivia' }]}
              sx={{
                '& .MuiSelect-select': {
                  padding: 0,
                },
              }}
            />
          </Box>
        </TitleContainer>
        <TitleContainer label="Work email">
          <Typography variant="p14">{'olivia.piterson@gmail.com'}</Typography>
        </TitleContainer>
        <TitleContainer label="Phone number">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PhoneIcon />
            <Typography variant="p14">{'+4 123 345 244'}</Typography>
          </Box>
        </TitleContainer>
      </ContactContainer>
      <Divider />
    </>
  );
};

export default ContactItem;
