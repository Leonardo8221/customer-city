import { FC, useState, ChangeEvent, useEffect } from 'react';
import { Container, Grid, FormHelperText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import omitBy from 'lodash.omitby';

import { Form, Input, LoadingButton } from 'components/ui';
import { Navbar } from 'components/Navbar';
import { useCompany } from 'store/company/hooks';
import { Company, CreateCompanyData } from 'store/company/types';

interface CompanyValues {
  name: string;
  address?: string;
  billingAddress?: string;
  ownerName: string;
  ownerEmail: string;
}

const initialCompany = {
  name: '',
  address: '',
  billingAddress: '',
  ownerName: '',
  ownerEmail: '',
};

const CreateCompany: FC = () => {
  const location = useLocation();
  const state = location.state as Company | null;
  const [company, setCompany] = useState<CompanyValues>({
    ...initialCompany,
    ...omitBy(state ?? {}, (value) => !value),
  });
  const { loading, error, success, createCompany, updateCompany } = useCompany();

  useEffect(() => {
    if (success && !state) setCompany(initialCompany);
  }, [state, success]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompany((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const onSubmit = () => {
    if (!company.name || !company.ownerName || !company.ownerEmail) return;

    if (!state) {
      const data: CreateCompanyData = {
        name: company.name,
        ownerName: company.ownerName,
        ownerEmail: company.ownerEmail,
      };
      if (company.address) data.address = company.address;
      if (company.billingAddress) data.billingAddress = company.billingAddress;

      createCompany(data);
      return;
    }

    const data: Partial<CreateCompanyData> = {};
    if (company.name !== state.name) data.name = company.name;
    if (company.address !== state.address) data.address = company.address;
    if (company.billingAddress !== state.billingAddress) data.billingAddress = company.billingAddress;
    if (company.ownerName !== state.ownerName) data.ownerName = company.ownerName;
    if (company.ownerEmail !== state.ownerEmail) data.ownerEmail = company.ownerEmail;

    updateCompany({ id: state.id, data });
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container spacing={2} style={{ marginTop: 70 }}>
          <Grid item xs={12} md={6}>
            <Form noValidate style={{ minHeight: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <Input
                id="name"
                name="name"
                type="text"
                label="Company Name*"
                variant="standard"
                value={company.name}
                onChange={onChange}
                fullWidth
              />

              <Input
                id="address"
                name="address"
                type="text"
                label="Company Address"
                variant="standard"
                value={company.address}
                onChange={onChange}
                fullWidth
              />

              <Input
                id="billingAddress"
                name="billingAddress"
                type="text"
                label="Billing Address"
                variant="standard"
                value={company.billingAddress}
                onChange={onChange}
                fullWidth
              />

              <Input
                id="ownerName"
                name="ownerName"
                type="text"
                label="Account Owner*"
                variant="standard"
                value={company.ownerName}
                onChange={onChange}
                fullWidth
              />

              <Input
                id="ownerEmail"
                name="ownerEmail"
                type="email"
                label="E-mail address*"
                variant="standard"
                value={company.ownerEmail}
                onChange={onChange}
                fullWidth
              />

              <LoadingButton
                onClick={onSubmit}
                loading={loading}
                variant="outlined"
                type="submit"
                style={{ alignSelf: 'flex-end' }}
              >
                {state ? 'Update company' : 'Add & Send e-amil'}
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
    </>
  );
};

export default CreateCompany;
