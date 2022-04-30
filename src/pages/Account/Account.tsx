import { FC, useState } from 'react';
import { Container, Grid, FormHelperText } from '@mui/material';

import { Navbar } from 'components/Navbar';
import { Form, Input, LoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';

const Account: FC = () => {
  const { loading, error, email } = useAuth();
  const [username, setUsername] = useState(email);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = () => {
    if (!username || !password || !newPassword) return;
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Form noValidate>
              <Input
                id="username"
                name="username"
                type="email"
                label="Username"
                variant="standard"
                value={username}
                onChange={(event) => setUsername(event.target.value as string)}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={(event) => setPassword(event.target.value as string)}
              />

              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                label="New password"
                variant="standard"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value as string)}
              />

              <LoadingButton onClick={onSubmit} loading={loading} variant="outlined">
                Change password
              </LoadingButton>

              {error && (
                <FormHelperText error>{typeof error === 'string' ? error : 'Something went wrong!'}</FormHelperText>
              )}
            </Form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Account;
