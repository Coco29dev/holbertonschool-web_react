import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  test('renders a li with data-notification-type "default"', () => {
    const { container } = render(
      <NotificationItem type="default" value="New course available" />
    );
    const li = container.querySelector('li');

    expect(li).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders a li with data-notification-type "urgent"', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="New resume available" />
    );
    const li = container.querySelector('li');

    expect(li).toHaveAttribute('data-notification-type', 'urgent');
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

  test('calls the markAsRead prop with the id when clicked', () => {
    const markAsRead = jest.fn();
    const { container } = render(
      <NotificationItem
        type="default"
        value="New course available"
        id={1}
        markAsRead={markAsRead}
      />
    );

    fireEvent.click(container.querySelector('li'));

    expect(markAsRead).toHaveBeenCalledTimes(1);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });

  test('does not re-render when the props are unchanged', () => {
    const markAsRead = jest.fn();
    const { container, rerender } = render(
      <NotificationItem type="default" value="Same" id={1} markAsRead={markAsRead} />
    );
    const li = container.querySelector('li');
    li.setAttribute('data-touched', 'true');

    rerender(
      <NotificationItem type="default" value="Same" id={1} markAsRead={markAsRead} />
    );

    expect(container.querySelector('li')).toHaveAttribute('data-touched', 'true');
  });

  test('re-renders when a prop changes', () => {
    const { container, rerender } = render(
      <NotificationItem type="default" value="Before" id={1} />
    );

    rerender(<NotificationItem type="default" value="After" id={1} />);

    expect(container.querySelector('li')).toHaveTextContent('After');
  });
});
