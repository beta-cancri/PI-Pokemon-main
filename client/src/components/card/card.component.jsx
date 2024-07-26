import React from 'react';
import { Link } from 'react-router-dom';
import './card.styles.css';

const Card = ({ pokemon }) => {
  console.log('Rendering card for pokemon:', pokemon); // Debugging log
  return (
    <Link to={`/detail/${pokemon.id}`} className="card-link">
      <div className="card">
        <img src={pokemon.image} alt={pokemon.name} className="card-image" />
        <h3>{pokemon.name}</h3>
        <p>{pokemon.types.join(', ')}</p>
      </div>
    </Link>
  );
};

export default Card;
