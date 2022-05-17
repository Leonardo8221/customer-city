import { FC, useState, useRef } from 'react';
import { Grid, Typography, Divider, IconButton, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createUser as createUserApi } from 'http/user';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { TextButton, Modal, ModalContainer, ModalHeader, ModalMain, ModalFooter } from 'components/ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { UserRole } from 'core/types';
import { CustomInput } from 'components/CustomInput';
import { PHONE_REGEX } from 'core/constants';

interface AddNewUserModalProps {
  open: boolean;
  toggleOpen: () => void;
  getUsers: () => Promise<void>;
}

interface FormValues {
  userName: string;
  userEmail: string;
  workPhoneNumber: string;
  additionalPhoneNumber: string;
  userRole: UserRole;
}

const validationSchema = yup.object({
  userName: yup.string().required('Required').min(3, 'Invalid name'),
  userEmail: yup.string().required('Required').email('Invalid email'),
  workPhoneNumber: yup.string().required('Required').matches(PHONE_REGEX, 'Invalid phone number'),
  additionalPhoneNumber: yup.string(),
  userRole: yup.string().oneOf(Object.values(UserRole), 'Invalid role'),
});

const initialValues: FormValues = {
  userName: '',
  userEmail: '',
  workPhoneNumber: '',
  additionalPhoneNumber: '',
  userRole: UserRole.USER,
};

const AddNewUserModal: FC<AddNewUserModalProps> = ({ open, toggleOpen, getUsers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await createUserApi(values);
      closeModal();
      getUsers();
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            New User
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>

        <Divider />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formRef}
        >
          {({ values, isValid, errors, touched, dirty, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <>
              <ModalMain>
                <form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomInput
                          id="userName"
                          name="userName"
                          label="Name"
                          fullWidth
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.userName && !!errors.userName}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomInput
                          id="userEmail"
                          name="userEmail"
                          type="email"
                          label="Work email"
                          fullWidth
                          value={values.userEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.userEmail && !!errors.userEmail}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                      <Grid item xs={6}>
                        <CustomInput
                          id="workPhoneNumber"
                          name="workPhoneNumber"
                          type="tel"
                          label="Work phone number"
                          fullWidth
                          value={values.workPhoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.workPhoneNumber && !!errors.workPhoneNumber}
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
                          id="userRole"
                          label="Role"
                          placeholder="Role"
                          value={values.userRole}
                          options={[
                            { label: 'Administrator', value: UserRole.ADMIN },
                            { label: 'Owner', value: UserRole.OWNER },
                            { label: 'Business User', value: UserRole.USER },
                          ]}
                          onSelect={(value) => setFieldValue('userRole', value)}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      {!!error && (
                        <FormHelperText sx={{ color: 'red.main', textAlign: 'center', marginTop: 2 }}>
                          {typeof error === 'string' ? error : 'Something went wrong!'}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </ModalMain>

              <Divider />

              <ModalFooter>
                <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                  Cancel
                </TextButton>

                <LoadingButton
                  variant="contained"
                  disabled={!(isValid && dirty)}
                  loading={loading}
                  onClick={() => handleSubmit()}
                  type="submit"
                >
                  Add new user
                </LoadingButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default AddNewUserModal;
