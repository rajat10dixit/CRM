import React, { useState } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileImage from '../assets/profile.png'; // Make sure path is correct
import './TopNavbar.css'; // Add styles here

const TopNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="text-dark">
          CRM System
        </Navbar.Brand>

        {/* Profile image always visible on right */}
        <Dropdown show={showDropdown} onToggle={setShowDropdown} align="end">
          <Dropdown.Toggle as="div" className="profile-toggle">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle"
              onClick={toggleDropdown}
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
