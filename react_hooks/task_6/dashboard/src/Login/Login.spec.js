import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  test('renders 2 labels, 2 text inputs, and 1 submit input', () => {
    const { container } = render(<Login />);
    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input:not([type="submit"])')).toHaveLength(2);
    expect(container.querySelectorAll('input[type="submit"]')).toHaveLength(1);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  test('focuses the associated input when its label is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.click(screen.getByText(/email/i, { selector: 'label' }));
    expect(screen.getByLabelText(/email/i)).toHaveFocus();

    await user.click(screen.getByText(/password/i, { selector: 'label' }));
    expect(screen.getByLabelText(/password/i)).toHaveFocus();
  });

  test('the submit button is disabled by default', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  test('updates the inputs values as the user types', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  test('the submit button is enabled only when the email is valid and the password has at least 8 characters', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /ok/i });

    await user.type(emailInput, 'not-an-email');
    await user.type(passwordInput, 'password123');
    expect(submit).toBeDisabled();

    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(submit).toBeEnabled();

    await user.clear(passwordInput);
    await user.type(passwordInput, 'short');
    expect(submit).toBeDisabled();

    await user.type(passwordInput, '123');
    expect(submit).toBeEnabled();

    await user.clear(emailInput);
    expect(submit).toBeDisabled();
  });

  test('submitting the form does not reload the page', async () => {
    const user = userEvent.setup();
    const { container } = render(<Login />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    // fireEvent returns false when the handler called preventDefault()
    expect(fireEvent.submit(container.querySelector('form'))).toBe(false);
  });

  test('calls the logIn prop with the email and password when the form is submitted', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();
    render(<Login logIn={logIn} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /ok/i }));

    expect(logIn).toHaveBeenCalledTimes(1);
    expect(logIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
