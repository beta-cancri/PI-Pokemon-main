import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.styles.css';

const Navbar = ({ search, setSearch, handleSearchSubmit, handleClearSearch }) => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-links">
          {location.pathname !== '/home' && (
            <Link to="/home" className="nav-link">
              Home
            </Link>
          )}
          {location.pathname !== '/create' && (
            <Link to="/create" className="nav-link">
              Create Pokémon
            </Link>
          )}
        </div>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search Pokémon by name"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
          {search && (
            <button type="button" className="clear-search" onClick={handleClearSearch}>
              Clear Search
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
