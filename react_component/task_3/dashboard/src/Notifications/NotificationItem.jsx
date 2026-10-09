import { Component } from 'react';

class NotificationItem extends Component {
  static defaultProps = {
    type: 'default',
    value: '',
    markAsRead: () => {},
  };

  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const color = type === 'urgent' ? 'red' : 'blue';
    const handleClick = () => markAsRead(id);

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={{ color }}
          dangerouslySetInnerHTML={html}
          onClick={handleClick}
        />
      );
    }

    return (
      <li data-notification-type={type} style={{ color }} onClick={handleClick}>
        {value}
      </li>
    );
  }
}

export default NotificationItem;
