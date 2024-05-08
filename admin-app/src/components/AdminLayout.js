import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="row">
            <div className="col-12">
              <Header />
            </div>
            <div className="col-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
