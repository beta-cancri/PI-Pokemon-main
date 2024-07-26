import { FETCH_POKEMONS_SUCCESS, FETCH_POKEMON_DETAIL_SUCCESS, CREATE_POKEMON_SUCCESS } from '../actions';

const initialState = {
  pokemons: [],
  pokemonDetail: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS_SUCCESS:
      console.log('FETCH_POKEMONS_SUCCESS payload:', action.payload); // Debugging log
      return {
        ...state,
        pokemons: action.payload,
      };
    case FETCH_POKEMON_DETAIL_SUCCESS:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CREATE_POKEMON_SUCCESS:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
