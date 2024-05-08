import React from "react";
import {  DropdownButton, Dropdown } from 'react-bootstrap';

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
          {/* Search Box */}
          <form className="d-flex me-auto ms-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          {/* User Profile Dropdown */}
          <DropdownButton
            id="dropdownMenuButton"
            variant="success"
            title={
              <span>
                <span className="me-2">Admin</span>
                <i className="fas fa-user-circle"></i>
              </span>
            }
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
