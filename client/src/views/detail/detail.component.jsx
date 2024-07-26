import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonDetail } from '../../redux/actions';
import './detail.styles.css';

const DetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(fetchPokemonDetail(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className="detail">
      {pokemon ? (
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>ID: {pokemon.id}</p>
          <p>Health: {pokemon.health}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Speed: {pokemon.speed}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types.join(', ')}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
