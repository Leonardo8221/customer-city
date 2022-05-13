import { FC } from 'react';
import { Grid, Typography, Divider, IconButton, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { TextButton } from 'components/ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { UserRole } from 'core/types';
import { CustomInput } from 'components/CustomInput';
import { PHONE_REGEX } from 'core/constants';
import { Modal, Container, Header, Footer, Main } from './ui';

interface AddNewUserModalProps {
  open: boolean;
  toggleOpen: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  role: UserRole;
}

const validationSchema = yup.object({
  name: yup.string().required('Required').min(3, 'Invalid name'),
  email: yup.string().required('Required').email('Invalid email'),
  phoneNumber: yup.string().required('Required').matches(PHONE_REGEX, 'Invalid phone number'),
  additionalPhoneNumber: yup.string(),
  role: yup.string().oneOf(Object.values(UserRole), 'Invalid role'),
});

const initialValues: FormValues = {
  name: '',
  email: '',
  phoneNumber: '',
  additionalPhoneNumber: '',
  role: UserRole.USER,
};

const AddNewUserModal: FC<AddNewUserModalProps> = ({ open, toggleOpen }) => {
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <Container>
        <Header>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            New User
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </Header>

        <Divider />

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, isValid, errors, touched, dirty, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <>
              <Main>
                <form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomInput
                          id="name"
                          name="name"
                          label="Name"
                          fullWidth
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && !!errors.name}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomInput
                          id="email"
                          name="email"
                          type="email"
                          label="Work email"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && !!errors.email}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomInput
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          label="Work phone number"
                          fullWidth
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phoneNumber && !!errors.phoneNumber}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CustomInput
                          id="additionalPhoneNumber"
                          name="additionalPhoneNumber"
                          type="tel"
                          label="Additional number (optional)"
                          fullWidth
                          value={values.additionalPhoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.additionalPhoneNumber && !!errors.additionalPhoneNumber}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomDropdown<UserRole>
                          id="role"
                          label="Role"
                          placeholder="Role"
                          value={values.role}
                          options={[
                            { label: 'Administrator', value: UserRole.ADMIN },
                            { label: 'Owner', value: UserRole.OWNER },
                            { label: 'Business User', value: UserRole.USER },
                          ]}
                          onSelect={(value) => setFieldValue('role', value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Main>

              <Divider />

              <Footer>
                <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                  Cancel
                </TextButton>

                <Button variant="contained" disabled={!(isValid && dirty)} onClick={() => handleSubmit()}>
                  Add new user
                </Button>
              </Footer>
            </>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};

export default AddNewUserModal;
