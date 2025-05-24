import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const closeSidebar = () => toggleSidebar(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        toggleSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleSidebar]);

  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? 'show open' : 'hide'}`}>
      <Nav className={`flex-column sidebar bright-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo-placeholder">
          <img src={logo} alt="CRM Logo" />
          <button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close sidebar">
            &times;
          </button>
        </div>
        <Nav.Link as={Link} to="/dashboard" onClick={closeSidebar}>
          Dashboard <i className="fas fa-tachometer-alt float-end"></i>
        </Nav.Link>
        <Nav.Link as={Link} to="/leads" onClick={closeSidebar}>
          Leads <i className="fas fa-user-friends float-end"></i>
        </Nav.Link>
        <Nav.Link as={Link} to="/campaigns" onClick={closeSidebar}>
          Campaigns <i className="fas fa-bullhorn float-end"></i>
        </Nav.Link>
        <Nav.Link as={Link} to="/tasks" onClick={closeSidebar}>
          Tasks <i className="fas fa-tasks float-end"></i>
        </Nav.Link>
        <Nav.Link as={Link} to="/team" onClick={closeSidebar}>
          Team <i className="fas fa-users float-end"></i>
        </Nav.Link>
        <Nav.Link as={Link} to="/settings/roles" onClick={closeSidebar}>
          Settings <i className="fas fa-cog float-end"></i>
        </Nav.Link>
      </Nav>
    </aside>
  );
};

export default Sidebar;
