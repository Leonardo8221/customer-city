import { FC, ChangeEvent, useEffect } from 'react';
import { FormHelperText, Typography, Box, InputLabel, Divider } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as GoogleSmallIcon } from 'assets/icons/googleSmall.svg';
import { Form, Input, LoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';
import { AuthLayout } from 'components/AuthLayout';
import { CustomLink } from 'components/CustomLink';
import { publicRoutes } from 'router/routes';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { noop, validatePassword } from 'core/utils';
import { usePrevious } from 'hooks';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const formSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email.'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'isValidPassword',
      'Password must be at least 8 characters long, include at least one lowercase and one uppercase character, and one number, symbol, or whitespace character.',
      validatePassword,
    ),
  rememberMe: yup.boolean(),
});

const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const { loading, error, session, login } = useAuth();
  const prevSession = usePrevious<string | null>(session);
  const navigate = useNavigate();

  useEffect(() => {
    if (prevSession !== session && session) navigate(publicRoutes.createPassword);
  }, [session, prevSession, navigate]);

  const initialValues: FormValues = {
    email: searchParams.get('email') ?? '',
    password: '',
    rememberMe: false,
  };

  const onSubmit = (values: FormValues) => {
    login(values);
  };

  return (
    <AuthLayout>
      <Box>
        <Typography variant="h2" marginBottom={4}>
          Welcome Back!
        </Typography>

        <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit}>
          {({ values, errors, touched, handleChange, setFieldValue, handleSubmit, handleBlur }) => (
            <Form noValidate>
              <Box>
                <InputLabel htmlFor="email">Email address</InputLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : ''}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Box>

              <Box marginTop="24px" marginBottom="4px">
                <InputLabel htmlFor="password">Password</InputLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ''}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Box>

              <CustomLink to={publicRoutes.resetPassword}>Forgot my password</CustomLink>

              <CustomCheckbox
                label="Remember me"
                containerSyle={{ marginTop: 26 }}
                checked={values.rememberMe}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFieldValue('rememberMe', event.target.checked)}
              />

              <LoadingButton
                loading={loading}
                disabled={!values.email || !values.password || !!errors.email || !!errors.password}
                marginTop="32px"
                type="submit"
                onClick={() => handleSubmit()}
              >
                Log in
              </LoadingButton>

              {!!error && (
                <FormHelperText sx={{ color: 'red.main', textAlign: 'center', marginTop: 2 }}>
                  {typeof error === 'string' ? error : 'Something went wrong!'}
                </FormHelperText>
              )}

              <Box marginTop="32px">
                <Divider>or</Divider>
              </Box>

              <LoadingButton onClick={noop} variant="outlined" marginTop="24px" startIcon={<GoogleSmallIcon />}>
                Sign in with Google
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  );
};

export default Login;
