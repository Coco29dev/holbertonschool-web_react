import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  static defaultProps = {
    type: 'default',
    value: '',
    markAsRead: () => {},
  };

  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const colorClass =
      type === 'urgent'
        ? 'text-(color:--urgent-notification-item)'
        : 'text-(color:--default-notification-item)';
    const handleClick = () => markAsRead(id);

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={colorClass}
          dangerouslySetInnerHTML={html}
          onClick={handleClick}
        />
      );
    }

    return (
      <li data-notification-type={type} className={colorClass} onClick={handleClick}>
        {value}
      </li>
    );
  }
}

export default NotificationItem;
