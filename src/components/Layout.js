import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { FaBars } from 'react-icons/fa';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`app-container d-flex ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-content flex-grow-1">
        <TopNavbar />
        <div className="toggle-btn d-md-none" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="page-content p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
