import userEvent from '@testing-library/user-event';

import { render, screen, waitFor, act } from 'test/test-utils';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);

  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /forgot my password/i })).toBeInTheDocument();

  const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
  expect(rememberMeCheckbox).toBeInTheDocument();
  expect(rememberMeCheckbox).not.toBeChecked();

  const logInButton = screen.getByRole('button', { name: /log in/i });
  expect(logInButton).toBeInTheDocument();
  expect(logInButton).toBeDisabled();

  const signInGoogleButton = screen.getByRole('button', { name: /sign in with google/i });
  expect(signInGoogleButton).toBeInTheDocument();
  expect(signInGoogleButton).toBeEnabled();
});

test('validates form inputs', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/^password$/i);

  await act(async () => {
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'Test1234!');
  });

  expect(emailInput).toHaveValue('email@email.com');
  expect(passwordInput).toHaveValue('Test1234!');
  expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled();
});
