import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './navbar.styles.css';

const Navbar = ({ search, setSearch, handleSearchSubmit, handleClearSearch }) => {
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.pathname !== '/home') {
      history.push('/home');
      setTimeout(() => {
        handleSearchSubmit(e);
      }, 100);
    } else {
      await handleSearchSubmit(e);
    }
  };

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
        {location.pathname === '/home' && (
          <form onSubmit={handleSubmit} className="search-form">
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
