import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

const renderWithUser = (isLoggedIn) =>
  render(
    <Footer
      user={{ email: 'test@example.com', password: 'password123', isLoggedIn }}
    />
  );

describe('Footer', () => {
  test('renders the copyright text with the current year and Holberton School', () => {
    render(<Footer />);

    const expectedCopy = getFooterCopy(true);
    const copyrightText = new RegExp(`copyright ${getCurrentYear()}.*${expectedCopy}`, 'i');

    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });

  test('does not display the "Contact us" link when the user is logged out in the props', () => {
    renderWithUser(false);

    expect(screen.queryByRole('link', { name: /contact us/i })).not.toBeInTheDocument();
  });

  test('displays the "Contact us" link when the user is logged in within the props', () => {
    renderWithUser(true);

    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });
});
