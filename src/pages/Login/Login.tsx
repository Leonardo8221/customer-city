import { FC, useState, ChangeEvent, useCallback, useMemo, useEffect } from 'react';
import { FormHelperText, Typography, Box, InputLabel, Divider } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { ReactComponent as GoogleSmallIcon } from 'assets/icons/googleSmall.svg';
import { Form, Input, LoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';
import { AuthLayout } from 'components/AuthLayout';
import { CustomLink } from 'components/CustomLink';
import { publicRoutes } from 'router/routes';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { noop, validatePassword, validateEmail } from 'core/utils';
import { usePrevious } from 'hooks';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email: boolean;
  password: boolean;
}

const initialValues: FormValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const initialErrors: FormErrors = {
  email: false,
  password: false,
};

const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<FormValues>({ ...initialValues, email: searchParams.get('email') ?? '' });
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const { loading, error, session, login } = useAuth();
  const prevSession = usePrevious<string | null>(session);
  const navigate = useNavigate();

  useEffect(() => {
    if (prevSession !== session && session) navigate(publicRoutes.createPassword);
  }, [session, prevSession, navigate]);

  const validateForm = useCallback(
    (name: string) => {
      const isValid = name === 'email' ? !validateEmail(values.email) : !validatePassword(values.password);
      setErrors((prevState) => ({ ...prevState, [name]: isValid }));
    },
    [values.email, values.password],
  );

  const debouncedValidateForm = useMemo(() => debounce(validateForm, 350), [validateForm]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    debouncedValidateForm(event.target.name);
  };

  const onSubmit = () => {
    if (!values.email || !values.password) {
      return;
    }

    login(values);
  };

  return (
    <AuthLayout>
      <Box>
        <Typography variant="h2" marginBottom={4}>
          Welcome Back!
        </Typography>

        <Form noValidate>
          <Box>
            <InputLabel htmlFor="email">Email address</InputLabel>

            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              placeholder="Email"
              error={errors.email}
              onBlur={() => validateForm('email')}
            />
          </Box>

          <Box marginTop="24px" marginBottom="4px">
            <InputLabel htmlFor="password">Password</InputLabel>

            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={onChange}
              placeholder="Password"
              error={errors.password}
              onBlur={() => validateForm('password')}
            />
          </Box>

          <CustomLink to={publicRoutes.login}>Forgot my password</CustomLink>

          <CustomCheckbox
            label="Remember me"
            containerSyle={{ marginTop: 26 }}
            checked={values.rememberMe}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValues((prevState) => ({ ...prevState, rememberMe: event.target.checked }))
            }
          />

          <LoadingButton
            onClick={onSubmit}
            loading={loading}
            disabled={!values.email || !values.password || errors.email || errors.password}
            marginTop="32px"
            type="submit"
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
      </Box>
    </AuthLayout>
  );
};

export default Login;
