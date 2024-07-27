import React from 'react';
import { Link } from 'react-router-dom';
import './card.styles.css';

const Card = ({ pokemon }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link to={`/detail/${pokemon.id}`} className="card-link">
      <div className="card">
        <img src={pokemon.image} alt={pokemon.name} className="card-image" />
        <h3 className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</h3>
        <p>{pokemon.types.join(', ')}</p>
      </div>
    </Link>
  );
};

export default Card;
