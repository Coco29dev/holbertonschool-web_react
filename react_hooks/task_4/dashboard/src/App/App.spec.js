import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function logIn(user) {
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /ok/i }));
}

describe('App', () => {
  test('renders an h1 with the text School Dashboard', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i })
    ).toBeInTheDocument();
  });

  test('renders the expected text in the app-body and app-footer paragraphs', () => {
    render(<App />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
    expect(
      screen.getByText(/copyright \d{4} holberton school main dashboard/i)
    ).toBeInTheDocument();
  });

  test('renders an image', () => {
    render(<App />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('renders email and password input elements', () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders Email and Password label elements', () => {
    render(<App />);
    expect(screen.getByText(/email/i, { selector: 'label' })).toBeInTheDocument();
    expect(screen.getByText(/password/i, { selector: 'label' })).toBeInTheDocument();
  });

  test('renders an OK button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });

  test('renders the Login form and no CourseList by default', () => {
    render(<App />);
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();
    expect(document.getElementById('CourseList')).not.toBeInTheDocument();
  });

  test('renders a CourseList table and unmounts Login after logging in', async () => {
    const user = userEvent.setup();
    render(<App />);

    await logIn(user);

    expect(document.getElementById('CourseList')).toBeInTheDocument();
    expect(
      screen.queryByText(/login to access the full dashboard/i)
    ).not.toBeInTheDocument();
  });

  test('renders the News from the School title and paragraph by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /news from the school/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ipsum lorem ipsum dolor sit amet/i).tagName).toBe('P');
  });

  test('renders the Log in to continue title when logged out', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: /log in to continue/i })
    ).toBeInTheDocument();
  });

  test('renders the Course list title when logged in', async () => {
    const user = userEvent.setup();
    render(<App />);
    await logIn(user);
    expect(
      screen.getByRole('heading', { level: 2, name: /course list/i })
    ).toBeInTheDocument();
  });

  describe('logout section', () => {
    test('is not displayed by default', () => {
      render(<App />);
      expect(document.getElementById('logoutSection')).not.toBeInTheDocument();
    });

    test('displays the user email after logging in', async () => {
      const user = userEvent.setup();
      render(<App />);

      await logIn(user);

      expect(document.getElementById('logoutSection')).toHaveTextContent(
        'Welcome test@example.com (logout)'
      );
    });

    test('logs the user out when the logout link is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      await logIn(user);

      await user.click(screen.getByRole('link', { name: /logout/i }));

      expect(document.getElementById('logoutSection')).not.toBeInTheDocument();
      expect(document.getElementById('CourseList')).not.toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
  });

  describe('notifications drawer', () => {
    test('is displayed by default', () => {
      render(<App />);
      expect(
        screen.getByText(/here is the list of notifications/i)
      ).toBeInTheDocument();
    });

    test('handleHideDrawer hides the drawer when the close button is clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(
        screen.queryByText(/here is the list of notifications/i)
      ).not.toBeInTheDocument();
    });

    test('handleDisplayDrawer displays the drawer again when "Your notifications" is clicked', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      fireEvent.click(screen.getByText(/your notifications/i));
      expect(
        screen.getByText(/here is the list of notifications/i)
      ).toBeInTheDocument();
    });
  });

  describe('user state', () => {
    test('logIn sets the email and isLoggedIn, and the Login form is replaced', async () => {
      const user = userEvent.setup();
      render(<App />);

      await logIn(user);

      expect(document.getElementById('logoutSection')).toHaveTextContent(
        'Welcome test@example.com (logout)'
      );
      expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    });

    test('logOut sets isLoggedIn to false and clears the email and password', async () => {
      const user = userEvent.setup();
      render(<App />);
      await logIn(user);

      await user.click(screen.getByRole('link', { name: /logout/i }));

      expect(document.getElementById('logoutSection')).not.toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
  });

  describe('markNotificationAsRead', () => {
    test('removes the clicked notification and logs its id', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      render(<App />);
      expect(screen.getAllByRole('listitem')).toHaveLength(3);

      fireEvent.click(screen.getByText(/new resume available/i));

      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(screen.queryByText(/new resume available/i)).not.toBeInTheDocument();
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Notification 2 has been marked as read'
      );

      consoleSpy.mockRestore();
    });
  });
});
