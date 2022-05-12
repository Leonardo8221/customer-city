import { FC } from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';

import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { DetailContainer, DetailValueContainer } from './ui';

interface UserDetailProps {
  label: string;
  value: string;
  type?: 'email' | 'phone';
  sx?: SxProps<Theme>;
}

const UserDetail: FC<UserDetailProps> = ({ label, value, type, sx }) => {
  return (
    <DetailContainer sx={sx}>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer>
        {type ? (
          type === 'email' ? (
            <Box>
              <EmailIcon />
            </Box>
          ) : (
            <Box>
              <PhoneIcon />
            </Box>
          )
        ) : null}

        <Typography variant="p14" sx={{ color: 'neutral.main', fontWeight: 400, marginTop: 0.5 }}>
          {value}
        </Typography>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default UserDetail;
