import React from "react";
import { NavLink } from "react-router-dom"; // Import for navigation links
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light d-flex flex-column justify-content-between h-100">
      {/* Brand logo and app title */}
      <div className="d-flex align-items-center mb-3 p-3">
        <NavLink
          to="/"
          className="fs-4 fw-bold"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Fruit Store
        </NavLink>
      </div>

      {/* Navigation links */}
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <NavLink className="nav-link active" exact to="/dashboard">
            <i className="fas fa-tachometer-alt me-2"></i>{" "}
            {/* Font Awesome icon */}
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            <i className="fas fa-users me-2"></i>
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/orders">
            <i className="fas fa-shopping-cart me-2"></i>
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">
            <i className="fas fa-apple-alt me-2"></i>
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/categories">
            <i className="fas fa-tags me-2"></i>
            Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
