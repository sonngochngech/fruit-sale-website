import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types

const LeftSidebar = ({ collapsed, toggleCollapse }) => {
  return (
    <aside className={`left-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="collapse-button" style={{right:'5px'}} onClick={toggleCollapse}>
        X
      </button>
      <div className="content">
        {/* Conditional rendering based on the collapsed state */}
        {!collapsed ? (
          <div class="sidebar">
          <ul class="menu">
            <li><Link to="/" class="menu-item">Dashboard</Link></li>
            <li class="submenu">
              <Link to="/users" class="menu-item">Applications</Link>
              <ul class="submenu-items">
                <li><Link to="/users">User</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/categories">Categories</Link></li>
              </ul>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            {/* Render only icons when collapsed */}
            <p>Icon 1</p>
            <p>Icon 2</p>
            <p>Icon 3</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;