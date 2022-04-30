import { FC, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { Form, Input, Button } from 'components/ui';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!username || !password) return;
    console.log({ username, password });
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

            <Button onClick={onSubmit}>Login</Button>
          </Form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
