import { FC } from 'react';
import { Grid, Typography, Box } from '@mui/material';

import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { Container, DetailContainer, TextLinkButton, DetailValueContainer } from './ui';

interface UserDetailProps {
  label: string;
  value: string;
  type?: 'email' | 'phone';
}

const UserDetail: FC<UserDetailProps> = ({ label, value, type }) => {
  return (
    <DetailContainer>
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

const Profile: FC = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} container sx={{ marginBottom: 5 }}>
          <Grid item xs={4}>
            <UserDetail label="Account Owner" value="Kasia Niewczas" />
          </Grid>

          <Grid item xs={4}>
            <UserDetail label="Company Name" value="The New Company" />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4}>
            <UserDetail label="Work email" value="roger.lyons@gmail.com" type="email" />
          </Grid>

          <Grid item xs={4}>
            <UserDetail label="Address" value="Main Street 100, New York" />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4}>
            <UserDetail label="Work phone number" value="+4 123 345 345" type="phone" />
          </Grid>

          <Grid item xs={4}>
            <UserDetail label="Company e-mail" value="invoices@newcompany.com" />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4}>
            <UserDetail label="Additional number" value="+4 123 345 345" type="phone" />
          </Grid>

          <Grid item xs={4}>
            <UserDetail label="Company URL" value="www.thenewcompany.com" />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextLinkButton>Reset user&apos;s password</TextLinkButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
