import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

const renderWithContext = (isLoggedIn) =>
  render(
    <newContext.Provider
      value={{
        user: { email: 'test@example.com', password: 'password123', isLoggedIn },
        logOut: () => {},
      }}
    >
      <Footer />
    </newContext.Provider>
  );

describe('Footer', () => {
  test('renders the copyright text with the current year and Holberton School', () => {
    render(<Footer />);

    const expectedCopy = getFooterCopy(true);
    const copyrightText = new RegExp(`copyright ${getCurrentYear()}.*${expectedCopy}`, 'i');

    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });

  test('does not display the "Contact us" link when the user is logged out in the context', () => {
    renderWithContext(false);

    expect(screen.queryByRole('link', { name: /contact us/i })).not.toBeInTheDocument();
  });

  test('displays the "Contact us" link when the user is logged in within the context', () => {
    renderWithContext(true);

    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });
});
