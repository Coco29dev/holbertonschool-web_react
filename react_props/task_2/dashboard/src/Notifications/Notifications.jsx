import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({ notifications = [] }) {
  return (
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
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            html={notification.html}
            value={notification.value}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
