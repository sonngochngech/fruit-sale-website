import "../App.css";
import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { base_domain } from "../utils/axiosConfig";
import 'boxicons/css/boxicons.min.css';
const {
  logoutUser,
  getNotifications,
  getUnreadNotificationCount,
} = require("../features/users/userSlice");

const Noti = () => {
  const URL = base_domain;
  const socket = io(URL, { autoConnect: true });
  socket.on("new notification", () => {
    dispatch(getUnreadNotificationCount());

    setTimeout(() => {
      dispatch(getNotifications());
    }, 200);
  });

  useEffect(() => {
    dispatch(getUnreadNotificationCount());
  }, []);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const notificationState = useSelector(
    (state) => state?.users?.unreadNotification
  );
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hello", userState.users);
    if (userState.users.id !== null) {
      socket.emit("authenticated", userState.users);
    }
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="dropdown" style={{ position: 'relative' }}>
      <div style={{ fontSize: 30, cursor: 'pointer' }} onClick={toggleDropdown}>
        <i className='bx bxs-bell'></i>
      </div>
      <span
        style={{ top: "-10px", left: "2px" }}
        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
      >
        {notificationState?.notificationCount}
      </span>
      {isDropdownOpen && (
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ display: 'block' }}>
          {notificationState?.unreadNotification?.length > 0 ? (
            notificationState.unreadNotification.map((item, index) => (
              <li key={index} className="list-group-item bg-dark">
                <a href="#" className="text-white">{item?.title}</a>
              </li>
            ))
          ) : (
            <li className="list-group-item bg-dark text-white">No new notifications</li>
          )}
        </ul>
      )}
    </div>
    </>
  );
};

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); // Perform logout logic using your Redux action
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div className="sidebar bg-light d-flex flex-column justify-content-between h-100">
      {/* Brand logo and app title */}
      <div className="d-flex align-items-center mb-3 p-3">
        <NavLink
          to="/admin/"
          className="fs-4 fw-bold"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Fruit Store
        </NavLink>
        <div>
          <Noti />
        </div>
      </div>

      {/* Navigation links */}
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <NavLink className="nav-link active" exact to="/admin/">
          <i class="bx bxs-grid-alt"></i>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/orders">
          <i className="bx bxs-food-menu"></i>
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/products">
          <i className="bx bxs-shopping-bag"></i>
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/categories">
          <i className="bx bx-list-check"></i>
            Categories
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/notifications">
          <i className='bx bxs-bell'></i>
            Notifications
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/notifications">
            <div onClick={handleLogout}> <i className="bx bx-log-out"></i> Logout</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
