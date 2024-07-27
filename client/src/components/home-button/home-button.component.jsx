import React from 'react';
import { Link } from 'react-router-dom';
import './home-button.styles.css';

const HomeButton = () => {
  return (
    <Link to="/home" className="home-button">
      Home
    </Link>
  );
};

export default HomeButton;
