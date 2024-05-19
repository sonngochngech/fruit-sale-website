// File: AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminLayout.css'; // Import the CSS file

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
