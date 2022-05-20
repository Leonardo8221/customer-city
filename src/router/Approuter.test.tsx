import userEvent from '@testing-library/user-event';

import { render, screen, act } from 'test/test-utils';
import AppRouter from './AppRouter';

jest.mock('jwt-decode', () => () => ({
  'cognito:groups': ['admin'],
  sub: 'f551f3c8-9fb8-4227-a919-1d72e98a885a',
}));

test('user can login with valid credentials', async () => {
  render(<AppRouter />, { withRouter: false });

  const validEmail = 'test@email.com';
  const validPassword = 'Test1234!';

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/^password$/i);
  const logInButton = screen.getByRole('button', { name: /log in/i });

  await act(async () => {
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(logInButton);
  });

  expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
});
