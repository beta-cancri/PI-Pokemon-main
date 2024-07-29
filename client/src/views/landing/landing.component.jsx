import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';

const LandingPage = () => {
  return (
    <div className="landing">
      <Link to="/home" className="enter-link">
        <button className="enter-button">Enter</button>
      </Link>
      <div className="click-me-label">Click me</div>
    </div>
  );
};

export default LandingPage;
