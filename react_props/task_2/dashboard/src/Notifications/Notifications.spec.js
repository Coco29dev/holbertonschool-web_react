import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const testNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
  },
];

describe('Notifications', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);
    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('renders a button element', () => {
    render(<Notifications />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('renders 3 notification items with the expected text via the notifications prop', () => {
    render(<Notifications notifications={testNotifications} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });

  test('logs a message to the console when the close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i)
    );

    consoleSpy.mockRestore();
  });
});
