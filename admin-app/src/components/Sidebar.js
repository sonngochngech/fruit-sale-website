import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light d-flex flex-column justify-content-between h-100">
      <div className="d-flex align-items-center mb-3 p-3">
        <NavLink
          to="/admin/"
          className="fs-4 fw-bold"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Fruit Store
        </NavLink>
      </div>

      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/admin/">
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/users">
            <i className="fas fa-users me-2"></i> Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/orders">
            <i className="fas fa-shopping-cart me-2"></i> Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/products">
            <i className="fas fa-apple-alt me-2"></i> Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/categories">
            <i className="fas fa-tags me-2"></i> Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
