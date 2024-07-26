import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css';

const LandingPage = () => {
  return (
    <div className="landing">
      <h1>Welcome to the Pokémon World</h1>
      <Link to="/home">
        <button className="enter-button">Enter</button>
      </Link>
    </div>
  );
};

export default LandingPage;
