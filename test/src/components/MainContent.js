// MainContent.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = ({ collapsed }) => {
  return (
    <main className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <Outlet />
    </main>
  );
};

export default MainContent;
