import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png';  // Import the image relative to this file location
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const closeSidebar = () => toggleSidebar(false);

  return (
    <Nav className={`flex-column sidebar bright-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-placeholder">
        <img src={logo} alt="CRM Logo" style={{ width: '150px', height: 'auto' }} />
      </div>
      <Nav.Link as={Link} to="/dashboard" onClick={closeSidebar}>Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/leads" onClick={closeSidebar}>Leads</Nav.Link>
      <Nav.Link as={Link} to="/campaigns" onClick={closeSidebar}>Campaigns</Nav.Link>
      <Nav.Link as={Link} to="/tasks" onClick={closeSidebar}>Tasks</Nav.Link>
      <Nav.Link as={Link} to="/team" onClick={closeSidebar}>Team</Nav.Link>
      <Nav.Link as={Link} to="/settings/roles" onClick={closeSidebar}>Settings</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
