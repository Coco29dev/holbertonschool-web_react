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

  test('renders the html prop content via dangerouslySetInnerHTML', () => {
    const { container } = render(
      <NotificationItem
        type="urgent"
        html={{ __html: '<strong>Urgent requirement</strong> - complete by EOD' }}
      />
    );
    const li = container.querySelector('li');

    expect(li.querySelector('strong')).toHaveTextContent('Urgent requirement');
    expect(li).toHaveTextContent('Urgent requirement - complete by EOD');
  });
});
