import { FETCH_POKEMONS_SUCCESS, FETCH_POKEMON_DETAIL_SUCCESS, CREATE_POKEMON_SUCCESS } from '../actions';

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  createdPokemon: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS_SUCCESS:
      console.log('Reducer updating pokemons state with payload:', action.payload);
      return {
        ...state,
        pokemons: action.payload,
      };
    case FETCH_POKEMON_DETAIL_SUCCESS:
      console.log('Reducer updating pokemonDetail state with payload:', action.payload);
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CREATE_POKEMON_SUCCESS:
      console.log('Reducer updating createdPokemon state with payload:', action.payload);
      return {
        ...state,
        createdPokemon: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
