import { FC, useState, useEffect, MouseEvent } from 'react';
import { Container, Grid, FormHelperText } from '@mui/material';

import { Form, Input, LoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';
import { PasswordInput } from 'components/PasswordInput';

const Account: FC = () => {
  const { loading, error, email: userEmail, success, changePassword } = useAuth();
  const [email, setUsername] = useState(userEmail);
  const [password, setEmail] = useState('');

  useEffect(() => {
    if (success) setEmail('');
  }, [success]);

  const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!email || !password) return;
    changePassword({ email, password });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ marginTop: 80 }}>
          <Form noValidate style={{ minHeight: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Username"
              variant="standard"
              value={email}
              onChange={(event) => setUsername(event.target.value as string)}
              disabled
              fullWidth
            />

            <PasswordInput
              id="password"
              name="password"
              type="password"
              label="New password"
              variant="standard"
              value={password}
              onChange={(event) => setEmail(event.target.value as string)}
              fullWidth
            />

            <LoadingButton onClick={onSubmit} loading={loading} variant="outlined" type="submit" sx={{ marginTop: 4 }}>
              Change password
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

export default Account;
