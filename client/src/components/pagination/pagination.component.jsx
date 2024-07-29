import React from 'react';
import './pagination.styles.css';

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => (e) => {
    e.preventDefault();
    paginate(number);
  };

  return (
    <nav className="pagination">
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number} className={`pagination-item ${number === currentPage ? 'active' : ''}`}>
            <a onClick={handleClick(number)} href="/" className="pagination-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
