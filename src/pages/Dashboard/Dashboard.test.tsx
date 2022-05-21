import { render, screen } from 'test/test-utils';
import { initialRootState } from 'store/reducers';
import { UserRole } from 'core/types';
import Dashboard from './Dashboard';

test('renders correct content for "super_admin"s', () => {
  const initialState = { ...initialRootState, auth: { ...initialRootState.auth, role: UserRole.SUPER_AMIN } };

  render(<Dashboard />, { initialState });

  expect(screen.getByRole('heading', { name: /companies/i })).toBeInTheDocument();
});

test('renders correct content for "admin"s', () => {
  const initialState = { ...initialRootState, auth: { ...initialRootState.auth, role: UserRole.ADMIN } };

  render(<Dashboard />, { initialState });

  expect(screen.getByRole('heading', { name: /crm, coming soon/i })).toBeInTheDocument();
});
