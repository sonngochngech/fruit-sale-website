import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light d-flex flex-column justify-content-between h-100">
      <div className="d-flex align-items-center mb-3 p-3">
        <Link
          to="/admin/"
          className="fs-4 fw-bold"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Fruit Store
        </Link>
      </div>

      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/">
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/users">
            <i className="fas fa-users me-2"></i> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/orders">
            <i className="fas fa-shopping-cart me-2"></i> Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/products">
            <i className="fas fa-apple-alt me-2"></i> Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/categories">
            <i className="fas fa-tags me-2"></i> Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
