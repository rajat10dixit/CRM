import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false); // optional auto-close on link click (mobile)

  return (
    <>
      {/* Toggle Button (Only visible on mobile) */}
      <div className="sidebar-toggle d-md-none" onClick={toggleSidebar}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>

      {/* Sidebar Navigation */}
      <Nav className={`flex-column sidebar bright-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo-placeholder">Logo</div>
        <Nav.Link as={Link} to="/dashboard" onClick={closeSidebar}>Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/leads" onClick={closeSidebar}>Leads</Nav.Link>
        <Nav.Link as={Link} to="/campaigns" onClick={closeSidebar}>Campaigns</Nav.Link>
        <Nav.Link as={Link} to="/tasks" onClick={closeSidebar}>Tasks</Nav.Link>
        <Nav.Link as={Link} to="/team" onClick={closeSidebar}>Team</Nav.Link>
        <Nav.Link as={Link} to="/settings/roles" onClick={closeSidebar}>Settings</Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;
