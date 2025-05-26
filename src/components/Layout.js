import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { FaBars } from 'react-icons/fa';
import './Layout.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <TopNavbar />
        {window.innerWidth <= 768 && (
          <button
            className="toggle-btn d-md-none"
            onClick={toggleSidebar}
            style={{ color: 'black' }}
          >
            <FaBars />
          </button>
        )}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
