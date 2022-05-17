import { FC, useState, useRef } from 'react';
import { Grid, Typography, Divider, IconButton, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain, ModalFooter, TextButton } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { CustomDropdown } from 'components/CustomDropdown';
import { CustomTextArea } from 'components/CustomTextarea';
import { PriceCurrencyContainer, Paper } from './ui';

interface FormValues {
  productName: string;
  productDescription: string;
  productCategory: string;
  productRateChargeType: string;
  productPrice: string;
  productCurrency: string;
}

const validationSchema = yup.object({
  productName: yup.string().required('Required').min(2, 'Invalid name'),
  productDescription: yup.string(),
  productCategory: yup.string().required('Required'),
  productRateChargeType: yup.string().required('Required'),
  productPrice: yup.string().required('Required'),
  productCurrency: yup.string().required('Required'),
});

const initialValues: FormValues = {
  productName: '',
  productDescription: '',
  productCategory: '',
  productRateChargeType: '',
  productPrice: '',
  productCurrency: 'USD',
};

interface ProductModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const ProductModal: FC<ProductModalProps> = ({ open, toggleOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = () => {
    setLoading(true);
    try {
      // TODO:
      closeModal();
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            New Product
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
              <ModalMain>
                <form noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <CustomInput
                        id="productName"
                        name="productName"
                        label="Product name"
                        placeholder="Type the Product name"
                        fullWidth
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.productName && !!errors.productName}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomTextArea
                        id="productDescription"
                        name="productDescription"
                        label={
                          <Typography variant="labelRegular12">
                            Description{' '}
                            <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                              (optional)
                            </Typography>
                          </Typography>
                        }
                        placeholder="Add description to the product"
                        minRows={4}
                        maxRows={8}
                        value={values.productDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <CustomDropdown<string>
                        id="productCategory"
                        label="Category"
                        placeholder="Not selected"
                        value={values.productCategory}
                        options={[
                          { label: 'Not selected', value: '' },
                          { label: 'Base product', value: 'base' },
                          { label: 'Add On', value: 'add-on' },
                          { label: 'Misc Product', value: 'misc' },
                        ]}
                        onSelect={(value) => setFieldValue('productCategory', value)}
                        InputProps={{
                          error: touched.productCategory && !!errors.productCategory,
                          onBlur: handleBlur,
                        }}
                        PaperComponent={Paper}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <CustomDropdown<string>
                        id="productRateChargeType"
                        label="Rate Charge Type"
                        placeholder="Not selected"
                        value={values.productRateChargeType}
                        options={[
                          { label: 'Not selected', value: '' },
                          { label: 'One-time', value: 'one-time' },
                          { label: 'Recurring', value: 'recurring' },
                          { label: 'Usage', value: 'usage' },
                        ]}
                        onSelect={(value) => setFieldValue('productRateChargeType', value)}
                        InputProps={{
                          error: touched.productRateChargeType && !!errors.productRateChargeType,
                          onBlur: handleBlur,
                        }}
                        PaperComponent={Paper}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <PriceCurrencyContainer>
                        <CustomInput
                          id="productPrice"
                          name="productPrice"
                          label="Standard Prices/Fees"
                          placeholder="Ex. 100"
                          type="number"
                          fullWidth
                          value={values.productPrice}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.productPrice && !!errors.productPrice}
                        />

                        <CustomDropdown<string>
                          id="productCurrency"
                          label="Currency"
                          placeholder="Not selected"
                          value={values.productCurrency}
                          options={[{ label: '$ USD (US Dollar)', value: 'USD' }]}
                          onSelect={(value) => setFieldValue('productCurrency', value)}
                        />
                      </PriceCurrencyContainer>
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
                  Add the product
                </LoadingButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default ProductModal;
