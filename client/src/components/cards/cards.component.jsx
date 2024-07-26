import React from 'react';
import Card from '../card/card.component';
import './cards.styles.css';

const Cards = ({ pokemons }) => {
  console.log('Cards component received pokemons:', pokemons); // Debugging log
  return (
    <div className="cards-container">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <Card key={pokemon.id || pokemon.name} pokemon={pokemon} />
        ))
      ) : (
        <p>No Pokémon found</p>
      )}
    </div>
  );
};

export default Cards;
