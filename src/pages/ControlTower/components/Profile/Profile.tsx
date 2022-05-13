import { FC } from 'react';
import { Grid } from '@mui/material';

import { TextLinkButton } from 'components/ui';
import { EditableInput } from 'components/EditableInput';
import { Container } from './ui';

const Profile: FC = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} container sx={{ marginBottom: 5 }}>
          <Grid item xs={4}>
            <EditableInput id="accountOwner" name="accountOwner" label="Account Owner" value="Kasia Niewczas" />
          </Grid>

          <Grid item xs={4}>
            <EditableInput id="companyName" name="companyName" label="Company Name" value="The New Company" />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4}>
            <EditableInput
              id="workEmail"
              name="workEmail"
              label="Work email"
              value="roger.lyons@gmail.com"
              type="email"
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput id="address" name="address" label="Address" value="Main Street 100, New York" />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4}>
            <EditableInput
              id="workPhoneNumber"
              name="workPhoneNumber"
              label="Work phone number"
              value="+4 123 345 345"
              type="tel"
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="companyEmail"
              name="companyEmail"
              label="Company e-mail"
              value="invoices@newcompany.com"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4}>
            <EditableInput
              id="additionalNumber"
              name="additionalNumber"
              label="Additional number"
              value="+4 123 345 345"
              type="tel"
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput id="companyUrl" name="companyUrl" label="Company URL" value="www.thenewcompany.com" />
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
