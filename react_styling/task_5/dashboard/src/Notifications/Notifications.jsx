import { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

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
    const shouldBounce = notifications.length > 0 && !displayDrawer;

    return (
      <div className="notifications-wrapper absolute top-3 right-5 z-10 w-1/4 text-right max-[912px]:right-3 max-[912px]:w-auto">
        <div className={`notification-title mb-1${shouldBounce ? ' animate-bounce' : ''}`}>Your notifications</div>
        {displayDrawer && (
          <div className="notification-items border-2 border-dashed border-(--main-color) bg-white p-1.5 text-left max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:h-screen max-[912px]:w-screen max-[912px]:overflow-y-auto max-[912px]:border-none max-[912px]:p-3">
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
              <img src={closeIcon} alt="" className="h-3 w-3" />
            </button>
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul className="list-[square] pl-5 max-[912px]:mt-3 max-[912px]:list-none max-[912px]:pl-0">
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
