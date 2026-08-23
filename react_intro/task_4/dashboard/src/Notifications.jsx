import closeIcon from './assets/close-button.png';
import { getLatestNotification } from './utils';
import './Notifications.css';

function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  );
}

export default Notifications;
