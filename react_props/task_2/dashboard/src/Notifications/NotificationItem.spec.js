import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  test('renders a blue li with data-notification-type "default"', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" />
    );
    const li = container.querySelector('li');

    expect(li).toHaveAttribute('data-notification-type', 'default');
    expect(li).toHaveStyle({ color: 'blue' });
  });

  test('renders a red li with data-notification-type "urgent"', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="New resume available" />
    );
    const li = container.querySelector('li');

    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li).toHaveStyle({ color: 'red' });
  });
});
