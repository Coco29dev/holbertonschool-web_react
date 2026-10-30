import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

const loggedInUser = {
  email: 'test@example.com',
  password: 'password123',
  isLoggedIn: true,
};

function renderWithContext(value) {
  return render(
    <newContext.Provider value={value}>
      <Header />
    </newContext.Provider>
  );
}

describe('Header', () => {
  test('renders the Holberton logo', () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('renders an h1 with the text School Dashboard', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i })
    ).toBeInTheDocument();
  });

  test('does not render logoutSection with the default context value', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#logoutSection')).not.toBeInTheDocument();
  });

  test('renders logoutSection when the user is logged in', () => {
    const { container } = renderWithContext({
      user: loggedInUser,
      logOut: () => {},
    });

    const logoutSection = container.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();
    expect(logoutSection).toHaveTextContent('Welcome test@example.com (logout)');
  });

  test('calls logOut from the context when the logout link is clicked', () => {
    const logOut = jest.fn();
    renderWithContext({ user: loggedInUser, logOut });

    fireEvent.click(screen.getByRole('link', { name: /logout/i }));

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
