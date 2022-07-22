import { FC } from 'react';
import { Grid } from '@mui/material';

import { updateCompany as updateCompanyApi } from 'http/company';
import { updateUser as updateUserApi } from 'http/user';
import { TextLinkButton } from 'components/ui';
import { EditableInput } from 'components/Editable';
import { Loader } from 'components/Loader';
import { useCompany } from 'store/company/hooks';
import { useUser } from 'store/user/hooks';
import { Container } from './ui';

const Profile: FC = () => {
  const { loading: userLoading, user } = useUser();
  const { loading: companyLoading, company } = useCompany();

  return (
    <Container position="relative">
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={3} sx={{ marginBottom: 5 }}>
          <Grid item xs={4}>
            <EditableInput
              id="accountOwner"
              name="accountOwner"
              label="Account Owner"
              value={user?.userName ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userName: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="companyName"
              name="companyName"
              label="Company Name"
              value={company?.companyName ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!company?.companyId) return;
                await updateCompanyApi(company.companyId, { companyName: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={3}>
          <Grid item xs={4}>
            <EditableInput
              id="workEmail"
              name="workEmail"
              label="Work email"
              value={user?.userEmail ?? ''}
              fullWidth
              type="email"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userEmail: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="address"
              name="address"
              label="Address"
              value={company?.companyAddress ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!company?.companyId) return;
                await updateCompanyApi(company.companyId, { companyAddress: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={3}>
          <Grid item xs={4}>
            <EditableInput
              id="phoneNumber"
              name="phoneNumber"
              label="Work phone number"
              value={user?.contactInfo?.phoneNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { phoneNumber: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="companyEmail"
              name="companyEmail"
              label="Company e-mail"
              value={company?.companyEmail ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!company?.companyId) return;
                await updateCompanyApi(company.companyId, { companyEmail: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={3}>
          <Grid item xs={4}>
            <EditableInput
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile number"
              value={user?.contactInfo.mobileNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { mobileNumber: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="companyUrl"
              name="companyUrl"
              label="Company URL"
              value={company?.companyWebsite ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!company?.companyId) return;
                await updateCompanyApi(company.companyId, { companyWebsite: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextLinkButton>Reset user&apos;s password</TextLinkButton>
        </Grid>
      </Grid>

      {(userLoading || companyLoading) && <Loader />}
    </Container>
  );
};

export default Profile;
