import React from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Image and User Profile Dropdown */}
          <div className="d-flex align-items-center me-auto ms-3">
            <img
              src="/path_to_your_image"
              alt="User Avatar"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span>Email@example.com</span>
          </div>
          {/* User Profile Dropdown */}
          <DropdownButton
            id="dropdownMenuButton"
            variant="success"
            title={<i className="fas fa-cog"></i>}
            menuAlign="end"
          >
            <Dropdown.Item href="#">Profile</Dropdown.Item>
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
