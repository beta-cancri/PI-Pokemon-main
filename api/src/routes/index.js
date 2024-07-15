const { Router } = require('express');
const pokemonRouter = require('./pokemonRouter');
const typeRouter = require('./typeRouter');

const mainRouter = Router();

mainRouter.use('/pokemons', pokemonRouter);
mainRouter.use('/types', typeRouter);

module.exports = mainRouter;