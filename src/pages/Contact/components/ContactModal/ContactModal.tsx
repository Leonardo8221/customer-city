import { FC, useState, useRef } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createContact as createContactApi, updateContact as updateContactApi } from 'http/contact';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain, ModalFooter, TextButton } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { Paper } from './ui';
import { useContact } from 'store/contact/hooks';
import { Contact } from 'store/contact/types';
import { IconAutoComplete } from 'components/IconAutoComplete';
import { RoleMutliSelect } from './components/RoleMultiSelect';

interface FormValues {
  contactFirstName: string;
  contactLastName: string;
  contactAssociate: string;
  contactRoles: string[];
}

const validationSchema = yup.object({
  contactFirstName: yup.string().required('Required').min(2, 'Invalid First Name'),
  contactLastName: yup.string().required('Required').min(2, 'Invalid Last Name'),
  contactAssociate: yup.string(),
  contactRoles: yup.array().of(yup.string()),
});

interface ContactModalProps {
  open: boolean;
  toggleOpen: () => void;
  contact?: Contact;
}

const ContactModal: FC<ContactModalProps> = ({ open, contact, toggleOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);
  const { getContacts } = useContact();

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

      if (contact) await updateContactApi(contact.contactId, data);
      else await createContactApi(data);

      getContacts();

      closeModal();
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    contactFirstName: contact?.contactFirstName ?? '',
    contactLastName: contact?.contactLastName ?? '',
    contactAssociate: contact?.contactAssociate ?? '',
    contactRoles: contact?.contactRoles ?? [],
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
                  <CustomInput
                    id="contactFirstName"
                    name="contactFirstName"
                    label="First name"
                    placeholder="Type the First name"
                    fullWidth
                    value={values.contactFirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contactFirstName && !!errors.contactFirstName}
                  />

                  <CustomInput
                    id="contact-last-name"
                    name="contactLastName"
                    label="Last name"
                    placeholder="Type the Last name"
                    fullWidth
                    value={values.contactLastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.contactLastName && !!errors.contactLastName}
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

                  <RoleMutliSelect<string>
                    id="contact-roles"
                    label="Role"
                    placeholder="Select Contact Role"
                    value={values.contactAssociate}
                    options={[]}
                    onSelect={(value) => setFieldValue('contactAssociate', value)}
                    InputProps={{
                      error: touched.contactAssociate && !!errors.contactAssociate,
                      onBlur: handleBlur,
                    }}
                    PaperComponent={Paper}
                  />
                </ModalMain>
              </form>

              <Divider />

              <ModalFooter>
                <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                  Cancel
                </TextButton>

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
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default ContactModal;
