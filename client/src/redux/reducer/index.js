import { FETCH_POKEMONS_SUCCESS, FETCH_POKEMON_DETAIL_SUCCESS, CREATE_POKEMON_SUCCESS, FETCH_TYPES_SUCCESS } from '../actions';

const initialState = {
  pokemons: [],
  pokemonDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS_SUCCESS:
      console.log('Reducer updating pokemons state with payload:', action.payload); // Debbuging log
      return {
        ...state,
        pokemons: action.payload,
      };
    case FETCH_POKEMON_DETAIL_SUCCESS:
      console.log('Reducer updating pokemonDetail state with payload:', action.payload); // Debbuging log
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CREATE_POKEMON_SUCCESS:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case FETCH_TYPES_SUCCESS:
      return {
        ...state,
        types: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
