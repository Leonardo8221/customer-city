import { FC, useState, ChangeEvent, useEffect, MouseEvent } from 'react';
import { Container, Grid, FormHelperText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import omitBy from 'lodash.omitby';

import { Form, Input, LoadingButton } from 'components/ui';
import { useTenant } from 'store/tenant/hooks';
import { Tenant } from 'store/tenant/types';

interface TenantValues {
  tenantName: string;
  tenantAddress?: string;
  tenantBillingAddress?: string;
  ownerName: string;
  ownerEmail: string;
}

const initialTenant = {
  tenantName: '',
  tenantAddress: '',
  tenantBillingAddress: '',
  ownerName: '',
  ownerEmail: '',
};

const CreateTenant: FC = () => {
  const location = useLocation();
  const state = location.state as Tenant | null;
  const [tenant, setTenant] = useState<TenantValues>({
    ...initialTenant,
    ...omitBy(state ?? {}, (value) => !value),
  });
  const { loading, error, success, createTenant, updateTenant } = useTenant();

  useEffect(() => {
    if (success && !state) setTenant(initialTenant);
  }, [state, success]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTenant((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();

    if (!tenant.tenantName || !tenant.ownerName || !tenant.ownerEmail) return;

    if (!state) {
      const data: Partial<Tenant> = {
        tenantName: tenant.tenantName,
        ownerName: tenant.ownerName,
        ownerEmail: tenant.ownerEmail,
      };
      if (tenant.tenantAddress) data.tenantAddress = tenant.tenantAddress;
      if (tenant.tenantBillingAddress) data.tenantBillingAddress = tenant.tenantBillingAddress;

      createTenant(data);
      return;
    }

    const data: Partial<Tenant> = {};
    if (tenant.tenantName !== state.tenantName) data.tenantName = tenant.tenantName;
    if (tenant.tenantAddress !== state.tenantAddress) data.tenantAddress = tenant.tenantAddress;
    if (tenant.tenantBillingAddress !== state.tenantBillingAddress)
      data.tenantBillingAddress = tenant.tenantBillingAddress;
    if (tenant.ownerName !== state.ownerName) data.ownerName = tenant.ownerName;
    if (tenant.ownerEmail !== state.ownerEmail) data.ownerEmail = tenant.ownerEmail;

    updateTenant({ tenantId: state.tenantId, data });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} style={{ marginTop: 80 }}>
        <Grid item xs={12} md={6}>
          <Form noValidate style={{ minHeight: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Input
              id="tenantName"
              name="tenantName"
              type="text"
              label="Company Name*"
              variant="standard"
              value={tenant.tenantName}
              onChange={onChange}
              fullWidth
            />

            <Input
              id="tenantAddress"
              name="tenantAddress"
              type="text"
              label="Company Address"
              variant="standard"
              value={tenant.tenantAddress}
              onChange={onChange}
              fullWidth
            />

            <Input
              id="tenantBillingAddress"
              name="tenantBillingAddress"
              type="text"
              label="Billing Address"
              variant="standard"
              value={tenant.tenantBillingAddress}
              onChange={onChange}
              fullWidth
            />

            <Input
              id="ownerName"
              name="ownerName"
              type="text"
              label="Account Owner*"
              variant="standard"
              value={tenant.ownerName}
              onChange={onChange}
              fullWidth
            />

            <Input
              id="ownerEmail"
              name="ownerEmail"
              type="email"
              label="E-mail address*"
              variant="standard"
              value={tenant.ownerEmail}
              onChange={onChange}
              fullWidth
            />

            <LoadingButton
              onClick={onSubmit}
              loading={loading}
              variant="outlined"
              type="submit"
              sx={{ marginTop: 4, alignSelf: 'flex-end' }}
            >
              {state ? 'Update tenant' : 'Add & Send e-mail'}
            </LoadingButton>

            {error && (
              <FormHelperText error>{typeof error === 'string' ? error : 'Something went wrong!'}</FormHelperText>
            )}

            {success && (
              <FormHelperText variant="filled" style={{ color: 'green' }}>
                {typeof success === 'string' ? success : 'Operation successfully done!'}
              </FormHelperText>
            )}
          </Form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateTenant;
