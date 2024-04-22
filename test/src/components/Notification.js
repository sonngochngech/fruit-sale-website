const Notification = ({ notifications }) => (
  <div className="notification-popup">
    <div className="notification-content">
      {notifications.map((notification, index) => (
        <div key={index}>{notification}</div>
      ))}
    </div>
  </div>
);

export default Notification;