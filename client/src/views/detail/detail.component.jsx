import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetail } from '../../redux/actions';
import HomeButton from '../../components/home-button/home-button.component';
import './detail.styles.css';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchPokemonDetail(id));
        setLoading(false);
      } else {
        console.error('No ID provided in URL');
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemonDetail || Object.keys(pokemonDetail).length === 0) {
    return <p>Pokemon not found</p>;
  }

  return (
    <div className="detail-page">
      <h1 className="pokemon-name">{capitalizeFirstLetter(pokemonDetail.name)}</h1>
      <img src={pokemonDetail.image} alt={pokemonDetail.name} />
      <p><strong>ID:</strong> {pokemonDetail.id}</p>
      <p><strong>Types:</strong> {pokemonDetail.types ? pokemonDetail.types.join(', ') : 'No types available'}</p>
      <p><strong>Health:</strong> {pokemonDetail.health}</p>
      <p><strong>Attack:</strong> {pokemonDetail.attack}</p>
      <p><strong>Defense:</strong> {pokemonDetail.defense}</p>
      <p><strong>Speed:</strong> {pokemonDetail.speed}</p>
      <p><strong>Height:</strong> {pokemonDetail.height}</p>
      <p><strong>Weight:</strong> {pokemonDetail.weight}</p>
    </div>
  );
};

export default DetailPage;
