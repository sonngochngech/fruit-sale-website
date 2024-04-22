import React, { useState } from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout">
      <Header />
      <LeftSidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <MainContent
        className={collapsed ? "main-content expanded" : "main-content"}
      />
    </div>
  );
};

export default Layout;
