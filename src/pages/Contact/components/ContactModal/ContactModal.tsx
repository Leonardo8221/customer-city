import { FC, useState, useRef } from 'react';
import { Typography, Divider, IconButton, Grid, Box, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createContact as createContactApi, updateContact as updateContactApi } from 'http/contact';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain, TextButton, PaginatedModalFooter } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { AddressBox, GridItem, Paper } from './ui';
import { Contact } from 'store/contact/types';
import { IconAutoComplete } from 'components/IconAutoComplete';
import { useNavigate, generatePath } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { CustomDropdown } from 'components/CustomDropdown';

interface FormValues {
  contactFirstName: string;
  contactMiddleName: string;
  contactLastName: string;
  contactTitle: string;
  contactAssociate: string;
  contactPrimaryEmail: string;
  contactSecondaryEmail: string;
  contactPhoneNumber: string;
  contactMobileNumber: string;
  contactRole: string;
  contactStage: string;
  contactType: string;
  contactStreet: string;
  contactState: string;
  contactCity: string;
  contactCountry: string;
  contactZipCode: string;
}

const validationSchema = yup.object({
  contactLastName: yup.string().required('Required').min(2, 'Invalid Last Name'),
});

interface ContactModalProps {
  open: boolean;
  toggleOpen: () => void;
  contact?: Contact;
}

const ContactModal: FC<ContactModalProps> = ({ open, contact, toggleOpen }) => {
  const navigate = useNavigate();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data: Partial<Contact> = {
        ...values,
      };

      let contactRes: Contact;

      if (contact) contactRes = await updateContactApi(contact.contactId, data);
      else contactRes = await createContactApi(data);

      navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.contactDetail, { id: String(contactRes.contactId) }));

      closeModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    contactFirstName: contact?.contactFirstName ?? '',
    contactMiddleName: contact?.contactMiddleName ?? '',
    contactLastName: contact?.contactLastName ?? '',
    contactTitle: contact?.contactTitle ?? '',
    contactAssociate: contact?.contactAssociate ?? '',
    contactRole: contact?.contactRole ?? '',
    contactPrimaryEmail: contact?.contactPrimaryEmail ?? '',
    contactSecondaryEmail: contact?.contactSecondaryEmail ?? '',
    contactPhoneNumber: contact?.contactPhoneNumber ?? '',
    contactMobileNumber: contact?.contactMobileNumber ?? '',
    contactStage: contact?.contactStage ?? '',
    contactType: contact?.contactType ?? '',
    contactStreet: contact?.contactStreet ?? '',
    contactState: contact?.contactState ?? '',
    contactCity: contact?.contactCity ?? '',
    contactCountry: contact?.contactCountry ?? '',
    contactZipCode: contact?.contactZipCode ?? '',
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {contact ? 'Update Contact' : 'New Contact'}
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
          {({ values, touched, errors, isValid, dirty, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
            <>
              <form noValidate>
                <ModalMain>
                  {isFirst ? (
                    <Grid container spacing={3}>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="contactFirstName"
                          name="contactFirstName"
                          label="First name"
                          placeholder="Enter the First name"
                          fullWidth
                          value={values.contactFirstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactFirstName && !!errors.contactFirstName}
                        />

                        <CustomInput
                          id="contactMiddleName"
                          name="contactMiddleName"
                          label="Middle name"
                          placeholder="Enter the Middle name"
                          fullWidth
                          value={values.contactMiddleName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactMiddleName && !!errors.contactMiddleName}
                        />

                        <CustomInput
                          id="contact-last-name"
                          name="contactLastName"
                          label="Last name *"
                          placeholder="Enter the Last name"
                          fullWidth
                          value={values.contactLastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactLastName && !!errors.contactLastName}
                        />

                        <CustomInput
                          id="contact-title"
                          name="contactTitle"
                          label="Title"
                          placeholder="Enter the title"
                          fullWidth
                          value={values.contactTitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactTitle && !!errors.contactTitle}
                        />
                      </GridItem>

                      <GridItem item xs={6}>
                        <CustomInput
                          id="contactRole"
                          name="contactRole"
                          label="Role"
                          placeholder="Enter Role"
                          fullWidth
                          value={values.contactRole}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactRole && !!errors.contactRole}
                        />
                        <CustomInput
                          id="contactPrimaryEmail"
                          name="contactPrimaryEmail"
                          label="Primary Email"
                          placeholder="Enter the Primary Email"
                          fullWidth
                          value={values.contactPrimaryEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactPrimaryEmail && !!errors.contactPrimaryEmail}
                        />

                        <CustomInput
                          id="contactSecondaryEmail"
                          name="contactSecondaryEmail"
                          label="Secondary Email"
                          placeholder="Enter the Secondary Email"
                          fullWidth
                          value={values.contactSecondaryEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactSecondaryEmail && !!errors.contactSecondaryEmail}
                        />

                        <CustomInput
                          id="contactPhoneNumber"
                          name="contactPhoneNumber"
                          label="Phone number"
                          placeholder="Enter the Phone number"
                          fullWidth
                          value={values.contactPhoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactPhoneNumber && !!errors.contactPhoneNumber}
                        />
                      </GridItem>
                    </Grid>
                  ) : (
                    <Grid container spacing={3}>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="contactMobileNumber"
                          name="contactMobileNumber"
                          label="Mobile number"
                          placeholder="Enter the Mobile number"
                          fullWidth
                          value={values.contactMobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactMobileNumber && !!errors.contactMobileNumber}
                        />

                        <IconAutoComplete<string>
                          id="contact-associates"
                          label="Associated Account"
                          placeholder="Select Associated Account"
                          value={values.contactAssociate}
                          options={[]}
                          onSelect={(value) => setFieldValue('contactAssociate', value)}
                          InputProps={{
                            error: touched.contactAssociate && !!errors.contactAssociate,
                            onBlur: handleBlur,
                          }}
                          PaperComponent={Paper}
                        />

                        <CustomDropdown<string>
                          id="contactStage"
                          label="Contact Stage"
                          placeholder="Select the Contact stage"
                          value={values.contactStage}
                          options={[]}
                          onSelect={(value) => setFieldValue('contactStage', value)}
                          InputProps={{
                            error: touched.contactStage && !!errors.contactStage,
                            onBlur: handleBlur,
                          }}
                          PaperComponent={Paper}
                        />

                        <CustomDropdown<string>
                          id="contactType"
                          label="Contact Type"
                          placeholder="Select the Contact type"
                          value={values.contactType}
                          options={[]}
                          onSelect={(value) => setFieldValue('contactType', value)}
                          InputProps={{
                            error: touched.contactType && !!errors.contactType,
                            onBlur: handleBlur,
                          }}
                          PaperComponent={Paper}
                        />
                      </GridItem>

                      <Grid item xs={6}>
                        <InputLabel sx={{ mb: 1 }}>Address</InputLabel>
                        <AddressBox>
                          <CustomInput
                            id="contactStreet"
                            name="contactStreet"
                            label="Street"
                            placeholder="Type the Street"
                            fullWidth
                            value={values.contactStreet}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.contactStreet && !!errors.contactStreet}
                          />
                          <Grid container spacing={3}>
                            <GridItem item xs={6}>
                              <CustomInput
                                id="contactCity"
                                name="contactCity"
                                label="City"
                                placeholder="Type the City"
                                fullWidth
                                value={values.contactCity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.contactCity && !!errors.contactCity}
                              />
                              <CustomInput
                                id="contactZipCode"
                                name="contactZipCode"
                                label="Zip code"
                                placeholder="Type the Zip code"
                                fullWidth
                                value={values.contactZipCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.contactZipCode && !!errors.contactZipCode}
                              />
                            </GridItem>
                            <GridItem item xs={6}>
                              <CustomInput
                                id="contactState"
                                name="contactState"
                                label="State/Province"
                                placeholder="Type the State/Province"
                                fullWidth
                                value={values.contactState}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.contactState && !!errors.contactState}
                              />
                              <CustomInput
                                id="contactCountry"
                                name="contactCountry"
                                label="Country"
                                placeholder="Type the Country"
                                fullWidth
                                value={values.contactCountry}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.contactCountry && !!errors.contactCountry}
                              />
                            </GridItem>
                          </Grid>
                        </AddressBox>
                      </Grid>
                    </Grid>
                  )}
                </ModalMain>
              </form>

              <Divider />

              <PaginatedModalFooter>
                <Box sx={{ width: 250 }}>
                  {!isFirst && (
                    <TextButton onClick={() => setIsFirst(true)} sx={{ fontWeight: 400 }}>
                      <NavBackIcon style={{ marginRight: 10 }} />
                      Back to Step 1
                    </TextButton>
                  )}
                </Box>
                <span>
                  <strong>{isFirst ? '1' : '2'}</strong> / 2
                </span>
                <Box sx={{ width: 250, display: 'flex', flexDirection: 'row-reverse' }}>
                  {isFirst ? (
                    <LoadingButton variant="contained" onClick={() => setIsFirst(false)}>
                      Next
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      variant="contained"
                      disabled={!(isValid && dirty)}
                      loading={loading}
                      onClick={(event) => {
                        event.preventDefault();
                        handleSubmit();
                      }}
                      type="submit"
                    >
                      {contact ? 'Update the contact' : 'Add the contact'}
                    </LoadingButton>
                  )}
                  <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                    Cancel
                  </TextButton>
                </Box>
              </PaginatedModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default ContactModal;
