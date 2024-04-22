import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from './Notification';

// Component for displaying user options
const UserOptions = ({ showUserOptions }) => (
  <div className={`user-options ${showUserOptions ? 'show' : ''}`}>
    <div>Tài khoản của tôi</div> 
    <div>Đăng xuất</div> 
  </div>
);

// Header component
const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false); // State to track the visibility of UserOptions
  const notificationRef = useRef(null);
  const userOptionsRef = useRef(null);
  const notifications = ["Notification 1", "Notification 2", "Notification 3", "Notification 3"];

  // Effect to handle click outside of notifications and user options
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications if clicked outside and not previously clicked
      if (!notificationClicked && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      // Close user options if clicked outside
      if (userOptionsRef.current && !userOptionsRef.current.contains(event.target)) {
        setShowUserOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [notificationClicked]);

  // Handler for notification click
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setNotificationClicked(!notificationClicked);
  };

  // Handler for user click
  const handleUserClick = () => {
    setShowUserOptions(!showUserOptions); // Toggle the visibility of UserOptions
  };

  return (
    <header className="header">
      <h1>Fruit Store</h1>
      <div className="header-actions">
        <div
          className="header-action"
          onClick={handleNotificationClick}
          ref={notificationRef}
        >
          <span>Notifications</span>
          <span className="badge">{notifications.length}</span>
        </div>
        {/* Render notifications if showNotifications is true */}
        {showNotifications && (
          <Notification notifications={notifications} />
        )}
        <div className="user-profile" ref={userOptionsRef}>
          <span className="user-name" onClick={handleUserClick}>John Doe <br />john.doe@gmail.com</span>
          {/* Render user options */}
          <UserOptions showUserOptions={showUserOptions} />
        </div>
      </div>
    </header>
  );
};

export default Header;
