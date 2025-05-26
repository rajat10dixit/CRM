import React, { useState } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileImage from '../assets/profile.png';
import './TopNavbar.css';

const TopNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="top-navbar">
      <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
        <Container fluid className="position-relative">
          {/* Center Brand */}
          <Navbar.Brand
  as={Link}
  to="/"
  className="position-absolute start-50 translate-middle-x text-dark fw-bold custom-bold"
>
  CRM System
</Navbar.Brand>


          {/* Right Profile Image */}
          <div className="ms-auto">
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
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default TopNavbar;
