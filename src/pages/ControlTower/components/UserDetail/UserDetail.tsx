import { FC, HTMLInputTypeAttribute } from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';

import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { DetailContainer, DetailValueContainer } from './ui';

interface UserDetailProps {
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  sx?: SxProps<Theme>;
}

const UserDetail: FC<UserDetailProps> = ({ label, value, type, sx }) => {
  const renderIcon = () => {
    switch (type) {
      case 'email':
        return (
          <Box>
            <EmailIcon />
          </Box>
        );
      case 'tel':
        return (
          <Box>
            <PhoneIcon />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <DetailContainer sx={sx}>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer>
        {renderIcon()}

        <Typography variant="p14" sx={{ color: 'neutral.main', fontWeight: 400, marginTop: 0.5 }}>
          {value}
        </Typography>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default UserDetail;
