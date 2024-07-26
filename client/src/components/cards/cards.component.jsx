import React from 'react';
import Card from '../card/card.component';
import './cards.styles.css';

const Cards = ({ pokemons }) => {
  console.log('Cards component received pokemons:', pokemons); // Debugging log
  return (
    <div className="cards-container">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default Cards;
