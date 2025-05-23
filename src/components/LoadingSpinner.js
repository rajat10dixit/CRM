// src/components/LoadingSpinner.js
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ fullPage = false }) => (
  <div className={`d-flex justify-content-center align-items-center ${fullPage ? 'vh-100' : ''}`}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;