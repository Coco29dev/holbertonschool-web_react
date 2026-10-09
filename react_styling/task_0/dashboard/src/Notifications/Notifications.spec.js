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
  test('renders a button element when displayDrawer is true', () => {
    render(<Notifications displayDrawer />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('renders 3 notification items with the expected text via the notifications prop', () => {
    render(<Notifications displayDrawer notifications={testNotifications} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });

  test('logs a message to the console when the close button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications displayDrawer />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i)
    );

    consoleSpy.mockRestore();
  });

  test('logs the marked as read message when a notification item is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications displayDrawer notifications={testNotifications} />);

    fireEvent.click(screen.getByText(/new resume available/i));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 2 has been marked as read'
    );

    consoleSpy.mockRestore();
  });

  test('does not re-render when the length of the notifications prop stays the same', () => {
    const { rerender } = render(
      <Notifications displayDrawer notifications={testNotifications} />
    );
    const sameLengthNotifications = [
      { id: 1, type: 'default', value: 'Different first notification' },
      { id: 2, type: 'urgent', value: 'Different second notification' },
      { id: 3, type: 'urgent', value: 'Different third notification' },
    ];

    rerender(
      <Notifications displayDrawer notifications={sameLengthNotifications} />
    );

    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/different first notification/i)
    ).not.toBeInTheDocument();
  });

  test('re-renders when the length of the notifications prop changes', () => {
    const { rerender } = render(
      <Notifications displayDrawer notifications={testNotifications} />
    );
    const longerNotifications = [
      ...testNotifications,
      { id: 4, type: 'default', value: 'Brand new notification' },
    ];

    rerender(
      <Notifications displayDrawer notifications={longerNotifications} />
    );

    expect(screen.getByText(/brand new notification/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  describe('when displayDrawer is false', () => {
    test('does not render the close button, the intro paragraph, or notification items', () => {
      render(
        <Notifications displayDrawer={false} notifications={testNotifications} />
      );

      expect(
        screen.queryByRole('button', { name: /close/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/here is the list of notifications/i)
      ).not.toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    test('still renders the "Your notifications" title', () => {
      render(<Notifications displayDrawer={false} />);
      expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });
  });

  describe('when displayDrawer is true', () => {
    test('renders the close button, the intro paragraph, and notification items', () => {
      render(<Notifications displayDrawer notifications={testNotifications} />);

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      expect(
        screen.getByText(/here is the list of notifications/i)
      ).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    test('still renders the "Your notifications" title', () => {
      render(<Notifications displayDrawer notifications={testNotifications} />);
      expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });
  });

  describe('when displayDrawer is true and notifications is empty', () => {
    test('renders the "No new notification for now" text', () => {
      render(<Notifications displayDrawer notifications={[]} />);
      expect(
        screen.getByText(/no new notification for now/i)
      ).toBeInTheDocument();
    });

    test('still renders the "Your notifications" title', () => {
      render(<Notifications displayDrawer notifications={[]} />);
      expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    });
  });
});
