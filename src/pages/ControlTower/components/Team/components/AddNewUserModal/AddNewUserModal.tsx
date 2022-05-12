import { FC } from 'react';
import { Grid, Typography, Divider, IconButton, InputLabel, TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { TextButton } from 'components/ui';
import { Modal, Container, Header, Footer, Main } from './ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { UserRole } from 'core/types';

interface AddNewUserModalProps {
  open: boolean;
  toggleOpen: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  role: UserRole | null;
}

const validationSchema = yup.object({
  name: yup.string().required('').min(3, ''),
  email: yup.string().required('').email(''),
  phoneNumber: yup.string().required(''),
  additionalPhoneNumber: yup.string(),
  role: yup.string().nullable(),
});

const initialValues: FormValues = {
  name: '',
  email: '',
  phoneNumber: '',
  additionalPhoneNumber: '',
  role: null,
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          isInitialValid={false}
        >
          {({ values, isValid, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <>
              <Main>
                <form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <InputLabel htmlFor="name" sx={{ marginBottom: 1 }}>
                          Name
                        </InputLabel>

                        <TextField
                          id="name"
                          name="name"
                          type="text"
                          fullWidth
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <InputLabel htmlFor="email" sx={{ marginBottom: 1 }}>
                          Work email
                        </InputLabel>

                        <TextField
                          id="email"
                          name="email"
                          type="email"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <InputLabel htmlFor="phoneNumber" sx={{ marginBottom: 1 }}>
                          Work phone number
                        </InputLabel>

                        <TextField
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          fullWidth
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <InputLabel htmlFor="additionalPhoneNumber" sx={{ marginBottom: 1 }}>
                          Additional number (optional)
                        </InputLabel>

                        <TextField
                          id="additionalPhoneNumber"
                          name="additionalPhoneNumber"
                          type="text"
                          fullWidth
                          value={values.additionalPhoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <InputLabel htmlFor="role" sx={{ marginBottom: 1 }}>
                          Role
                        </InputLabel>

                        <CustomDropdown<UserRole>
                          value={values.role}
                          options={[
                            { label: 'Administrator', value: UserRole.ADMIN },
                            { label: 'Owner', value: UserRole.OWNER },
                            { label: 'Business User', value: UserRole.USER },
                          ]}
                          onSelect={(value) => setFieldValue('role', value)}
                          placeholder="Role"
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

                <Button variant="contained" disabled={!isValid} onClick={() => handleSubmit()}>
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
