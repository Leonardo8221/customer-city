import { FC, useState, useRef } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createAccount as createAccountApi, updateAccount as updateAccountApi } from 'http/account';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalFooter, ModalHeader, ModalMain, TextButton } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { Paper } from './ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { Account } from 'store/account/types';
import { CustomTextArea } from 'components/CustomTextarea';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';

interface FormValues {
  accountName: string;
  description: string;
  // industryId: number;
  revenuePerYear: number;
  // accountType: string;
}

const validationSchema = yup.object({
  accountName: yup.string().required('Required').min(2, 'Invalid Last Name'),
});

interface AccountModalProps {
  open: boolean;
  toggleOpen: () => void;
  account?: Account;
}

const AccountModal: FC<AccountModalProps> = ({ open, account, toggleOpen }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data: Partial<Account> = {
        ...values,
      };

      let accountRes: Account;

      if (account) accountRes = await updateAccountApi(account.accountId, data);
      else accountRes = await createAccountApi(data);

      navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.accountDetail, { id: String(accountRes.accountId) }));

      closeModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    accountName: account?.accountName ?? '',
    revenuePerYear: account?.revenuePerYear ?? 0,
    // industryId: account?.industryId ?? 0,
    description: account?.description ?? '',
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {account ? 'Update Account' : 'New Account'}
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
                    id="accountName"
                    name="accountName"
                    label="Account name"
                    placeholder="Type the account name"
                    fullWidth
                    value={values.accountName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.accountName && !!errors.accountName}
                  />
                  <CustomTextArea
                    id="description"
                    name="description"
                    label={
                      <Typography variant="labelRegular12">
                        Description{' '}
                        <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                          (optional)
                        </Typography>
                      </Typography>
                    }
                    placeholder="Add description to the account"
                    minRows={4}
                    maxRows={8}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {/* <CustomDropdown<string>
                    id="accountType"
                    label="Account Type"
                    placeholder="Select the Account type"
                    value={values.accountType}
                    options={[]}
                    onSelect={(value) => setFieldValue('accountType', value)}
                    InputProps={{
                      error: touched.accountType && !!errors.accountType,
                      onBlur: handleBlur,
                    }}
                    PaperComponent={Paper}
                  /> */}

                  <CustomInput
                    id="accountRevenue"
                    name="revenuePerYear"
                    label="Company revenue"
                    type="number"
                    placeholder="Add company revenue"
                    fullWidth
                    value={values.revenuePerYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.revenuePerYear && !!errors.revenuePerYear}
                  />

                  {/* <CustomInput
                    id="industryId"
                    name="industryId"
                    type="number"
                    label="Company industry"
                    placeholder="Add company industry"
                    fullWidth
                    value={values.industryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.industryId && !!errors.industryId}
                  /> */}
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
                  {account ? 'Update the account' : 'Add the account'}
                </LoadingButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default AccountModal;
