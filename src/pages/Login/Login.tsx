import { FC, useState } from 'react';
import { Container, Grid, FormHelperText, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { Form, Input, LoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';

const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState(searchParams.get('email') ?? '');
  const [password, setPassword] = useState('');
  const { loading, error, login } = useAuth();

  const onSubmit = () => {
    if (!username || !password) return;
    login({ username, password });
  };

  return (
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

            <LoadingButton onClick={onSubmit} loading={loading} variant="outlined" type="submit">
              Login
            </LoadingButton>

            {error && (
              <FormHelperText error>{typeof error === 'string' ? error : 'Something went wrong!'}</FormHelperText>
            )}
          </Form>
        </Grid>

        {!!error && (
          <Grid item xs={12}>
            <Typography variant="caption" color="red">
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Login;
