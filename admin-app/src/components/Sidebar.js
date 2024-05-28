import "../App.css";
import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { base_domain } from "../utils/axiosConfig";
import "boxicons/css/boxicons.min.css";
import "./Sidebar.css";
const {
  logoutUser,
  getNotifications,
  getUnreadNotificationCount,
} = require("../features/users/userSlice");

const Noti = () => {
  const URL = base_domain;
  const socket = io(URL, { autoConnect: true });
  socket.on("new notification", () => {
    dispatch(getUnreadNotificationCount())
    .then(()=>{
      dispatch(getNotifications());
    });
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
    console.log(userState.user)
    if (userState.users.id !== null) {
      socket.emit("authenticated", userState.user);
    }
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="dropdown" style={{ position: "relative" }}>
        <div
          style={{ fontSize: 30, cursor: "pointer" }}
          onClick={toggleDropdown}
        >
          <i className="bx bxs-bell"></i>
        </div>
        <span
          style={{
            top: "-10px",
            left: "10px",
            display: "inline-block",
          }}
          className="badge bg-danger text-white rounded-circle p-2 position-absolute"
        >
          {notificationState?.notificationCount}
        </span>
        {isDropdownOpen && (
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ display: "block" }}
          >
            {notificationState?.unreadNotification?.length > 0 ? (
              notificationState.unreadNotification.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                >
                  <a href="notifications" className="text-dark text-truncate">
                    {item?.title}
                  </a>
                </li>
              ))
            ) : (
              <li className="list-group-item bg-dark text-white">
                No new notifications
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

const LogoutDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <b>Confirm Logout</b>
      </DialogTitle>
      <DialogContent>Are you sure you want to logout?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogout} color="secondary">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); // Perform logout logic using your Redux action
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">
          <NavLink to="/admin/" className="logo">
            Fruit Store
          </NavLink>
          <div>
            <Noti />
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <ul>
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
          <NavLink className="nav-link" to="/admin/paymentAccount">
          <i class='bx bx-credit-card-alt'></i>
            Add Payment Account
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/notifications">
            <i className="bx bxs-bell"></i>
            Notifications
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/notifications">
            <div
              onClick={handleOpenLogoutDialog}
              style={{ margin: 0, padding: 0 }}
            >
              {" "}
              <i className="bx bx-log-out"></i> Logout
            </div>
            <LogoutDialog
              open={logoutDialogOpen}
              onClose={handleCloseLogoutDialog}
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
