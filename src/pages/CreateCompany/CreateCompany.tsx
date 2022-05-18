import { FC, useState, ChangeEvent, useEffect } from 'react';
import { Container, Grid, FormHelperText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import omitBy from 'lodash.omitby';

import { Form, Input, LoadingButton } from 'components/ui';
import { useCompany } from 'store/company/hooks';
import { Company } from 'store/company/types';

interface CompanyValues {
  companyName: string;
  companyAddress?: string;
  companyBillingAddress?: string;
  ownerName: string;
  ownerEmail: string;
}

const initialCompany = {
  companyName: '',
  companyAddress: '',
  companyBillingAddress: '',
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
    if (!company.companyName || !company.ownerName || !company.ownerEmail) return;

    if (!state) {
      const data: Partial<Company> = {
        companyName: company.companyName,
        ownerName: company.ownerName,
        ownerEmail: company.ownerEmail,
      };
      if (company.companyAddress) data.companyAddress = company.companyAddress;
      if (company.companyBillingAddress) data.companyBillingAddress = company.companyBillingAddress;

      createCompany(data);
      return;
    }

    const data: Partial<Company> = {};
    if (company.companyName !== state.companyName) data.companyName = company.companyName;
    if (company.companyAddress !== state.companyAddress) data.companyAddress = company.companyAddress;
    if (company.companyBillingAddress !== state.companyBillingAddress)
      data.companyBillingAddress = company.companyBillingAddress;
    if (company.ownerName !== state.ownerName) data.ownerName = company.ownerName;
    if (company.ownerEmail !== state.ownerEmail) data.ownerEmail = company.ownerEmail;

    updateCompany({ companyId: state.companyId, data });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} style={{ marginTop: 80 }}>
        <Grid item xs={12} md={6}>
          <Form noValidate style={{ minHeight: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              label="Company Name*"
              variant="standard"
              value={company.companyName}
              onChange={onChange}
              fullWidth
            />

            <Input
              id="companyAddress"
              name="companyAddress"
              type="text"
              label="Company Address"
              variant="standard"
              value={company.companyAddress}
              onChange={onChange}
              fullWidth
            />

            <Input
              id="companyBillingAddress"
              name="companyBillingAddress"
              type="text"
              label="Billing Address"
              variant="standard"
              value={company.companyBillingAddress}
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
              sx={{ marginTop: 4, alignSelf: 'flex-end' }}
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
  );
};

export default CreateCompany;
