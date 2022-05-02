import { FC, useState, ChangeEvent } from 'react';
import { Container, Grid, FormHelperText } from '@mui/material';

import { Form, Input, LoadingButton } from 'components/ui';
import { Navbar } from 'components/Navbar';
import { useCompany } from 'store/company/hooks';
import { CreateCompanyData } from 'store/company/types';

interface Company {
  name: string;
  address?: string;
  billingAddress?: string;
  ownerName: string;
  ownerEmail: string;
}

const CreateCompany: FC = () => {
  const [company, setCompany] = useState<Company>({
    name: '',
    address: '',
    billingAddress: '',
    ownerName: '',
    ownerEmail: '',
  });
  const { loading, error, success, createCompany } = useCompany();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompany((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const onSubmit = () => {
    if (!company.name || !company.ownerName || !company.ownerEmail) return;
    const data: CreateCompanyData = {
      name: company.name,
      ownerName: company.ownerName,
      ownerEmail: company.ownerEmail,
    };
    if (company.address) data.address = company.address;
    if (company.billingAddress) data.billingAddress = company.billingAddress;
    createCompany(data);
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
                {'Add & Send e-amil'}
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
