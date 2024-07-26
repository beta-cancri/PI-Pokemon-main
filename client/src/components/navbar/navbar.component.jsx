import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/create" className="nav-link">Create Pokémon</Link>
    </nav>
  );
};

export default Navbar;
