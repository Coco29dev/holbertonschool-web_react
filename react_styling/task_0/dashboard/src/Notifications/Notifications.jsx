import { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

class Notifications extends Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { notifications, displayDrawer } = this.props;

    return (
      <div className="notifications-wrapper">
        <div className="notification-title">Your notifications</div>
        {displayDrawer && (
          <div className="notification-items">
            <button
              type="button"
              aria-label="Close"
              style={{
                float: 'right',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="" />
            </button>
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      html={notification.html}
                      value={notification.value}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Notifications;
