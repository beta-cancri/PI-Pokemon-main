import axios from 'axios';

export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS';
export const FETCH_POKEMON_DETAIL_SUCCESS = 'FETCH_POKEMON_DETAIL_SUCCESS';
export const CREATE_POKEMON_SUCCESS = 'CREATE_POKEMON_SUCCESS';
export const FETCH_TYPES_SUCCESS = 'FETCH_TYPES_SUCCESS';

export const fetchPokemons = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/pokemons');
    console.log('Fetched Pokemons:', response.data);
    dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pokemons:', error.message);
  }
};

export const fetchPokemonByName = (name) => async (dispatch) => {
  try {
    console.log(`Fetching Pokemon by name: ${name}`);
    const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
    console.log('Fetched Pokemon by name:', response.data);
    dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pokemon by name:', error.message);
    dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: [] });
  }
};

export const fetchPokemonDetail = (id) => async (dispatch) => {
  try {
    console.log(`Fetching Pokemon detail for ID: ${id}`); // Debugging log
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
    console.log('Fetched Pokemon detail:', response.data);
    dispatch({ type: FETCH_POKEMON_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pokemon detail:', error.message);
  }
};

export const createPokemon = (pokemon) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/pokemons', pokemon);
    console.log('Created Pokemon:', response.data);
    dispatch({ type: CREATE_POKEMON_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating pokemon:', error.message);
  }
};

export const fetchTypes = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/types');
    console.log('Fetched Types:', response.data);
    dispatch({ type: FETCH_TYPES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching types:', error.message);
  }
};
