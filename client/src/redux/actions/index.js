import axios from 'axios';

export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS';
export const FETCH_POKEMON_DETAIL_SUCCESS = 'FETCH_POKEMON_DETAIL_SUCCESS';
export const CREATE_POKEMON_SUCCESS = 'CREATE_POKEMON_SUCCESS';

export const fetchPokemons = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/pokemons');
    dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pokemons:', error);
  }
};

export const fetchPokemonDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
    dispatch({ type: FETCH_POKEMON_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pokemon detail:', error);
  }
};

export const createPokemon = (pokemon) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/pokemons', pokemon);
    dispatch({ type: CREATE_POKEMON_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating pokemon:', error);
  }
};
