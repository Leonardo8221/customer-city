import { FC, useState, ChangeEvent } from 'react';
import { Container, Grid } from '@mui/material';

import { Form, Input, LoadingButton } from 'components/ui';
import { Navbar } from 'components/Navbar';

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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompany((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const onSubmit = () => {
    if (!company.name || !company.ownerName || !company.ownerEmail) return;
    // TODO: Create company
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
                loading={false}
                variant="outlined"
                type="submit"
                style={{ alignSelf: 'flex-end' }}
              >
                {'Add & Send e-amil'}
              </LoadingButton>
            </Form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateCompany;
