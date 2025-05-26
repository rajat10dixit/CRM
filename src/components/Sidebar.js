import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [leadsOpen, setLeadsOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);  // Added for Tasks submenu

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

        {/* Leads Section */}
        <div className="nav-item-with-submenu">
          <Nav.Link onClick={() => setLeadsOpen(!leadsOpen)} className="d-flex justify-content-between align-items-center">
            <span>Leads</span>
            <i className={`fas fa-chevron-${leadsOpen ? 'up' : 'down'} float-end`}></i>
          </Nav.Link>
          <div className={`submenu ${leadsOpen ? 'show' : ''}`}>
            <Nav.Link as={Link} to="/leads/all" onClick={closeSidebar}>
              All Leads <i className="fas fa-list float-end"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/leads/new" onClick={closeSidebar}>
              New Leads <i className="fas fa-plus-circle float-end"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/leads/import" onClick={closeSidebar}>
              Import Leads <i className="fas fa-file-import float-end"></i>
            </Nav.Link>
          </div>
        </div>

        {/* Communication Section */}
        <div className="nav-item-with-submenu">
          <Nav.Link onClick={() => setCommunicationOpen(!communicationOpen)} className="d-flex justify-content-between align-items-center">
            <span>Communication</span>
            <i className={`fas fa-chevron-${communicationOpen ? 'up' : 'down'} float-end`}></i>
          </Nav.Link>
          <div className={`submenu ${communicationOpen ? 'show' : ''}`}>
            <Nav.Link as={Link} to="/communication/call-center" onClick={closeSidebar}>
              Call Center <i className="fas fa-phone float-end"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/communication/email-builder" onClick={closeSidebar}>
              Email Builder <i className="fas fa-envelope float-end"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/communication/sms-templates" onClick={closeSidebar}>
              SMS Templates <i className="fas fa-sms float-end"></i>
            </Nav.Link>
          </div>
        </div>

        <Nav.Link as={Link} to="/campaigns" onClick={closeSidebar}>
          Campaigns <i className="fas fa-bullhorn float-end"></i>
        </Nav.Link>

        {/* Tasks Section with submenu */}
        <div className="nav-item-with-submenu">
          <Nav.Link onClick={() => setTasksOpen(!tasksOpen)} className="d-flex justify-content-between align-items-center">
            <span>Tasks</span>
            <i className={`fas fa-chevron-${tasksOpen ? 'up' : 'down'} float-end`}></i>
          </Nav.Link>
          <div className={`submenu ${tasksOpen ? 'show' : ''}`}>
            <Nav.Link as={Link} to="/tasks" onClick={closeSidebar}>
              Task Board <i className="fas fa-tasks float-end"></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/tasks/Board" onClick={closeSidebar}>
              Task Details <i className="fas fa-info-circle float-end"></i>
            </Nav.Link>
            
          </div>
        </div>

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
