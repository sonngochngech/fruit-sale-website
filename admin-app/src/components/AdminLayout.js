import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="row">
            <div className="col-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
