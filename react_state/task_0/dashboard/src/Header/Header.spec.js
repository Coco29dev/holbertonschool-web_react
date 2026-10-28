import { render, screen } from '@testing-library/react';
import Header from './Header';

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
});
