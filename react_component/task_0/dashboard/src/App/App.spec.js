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

  test('renders the Login form when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();
  });

  test('renders a CourseList table when isLoggedIn is true', () => {
    render(<App isLoggedIn />);
    expect(document.getElementById('CourseList')).toBeInTheDocument();
  });
});
