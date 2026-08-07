import { render, screen } from '@testing-library/react';
import App from './App';

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
    expect(screen.getByText(/copyright \d{4} - holberton school/i)).toBeInTheDocument();
  });

  test('renders an image', () => {
    render(<App />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });
});
