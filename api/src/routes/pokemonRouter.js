const { Router } = require('express');
const {
  getDetailHandler,
  getPokemonHandler,
  createPokemonHandler,
} = require('../handlers/pokemonHandlers');

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemonHandler);
pokemonRouter.get('/:id', getDetailHandler);
pokemonRouter.post('/', createPokemonHandler);

module.exports = pokemonRouter;