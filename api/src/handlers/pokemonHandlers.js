const {
  createPokemonDB,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
} = require('../controllers/pokemonControllers');

const getPokemonHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemonByName = await getPokemonByName(name);
      console.log('Pokemon by name:', pokemonByName);
      res.status(200).json(pokemonByName);
    } else {
      const response = await getAllPokemons();
      console.log('All pokemons:', response);
      res.status(200).json(response);
    }
  } catch (error) {
    console.error('Error in getPokemonHandler:', error);
    res.status(400).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? 'bdd' : 'api';
  try {
    const response = await getPokemonById(id, source);
    console.log('Pokemon detail:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error in getDetailHandler:', error);
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  const { name, image, health, attack, defense, speed, height, weight, typeIds } = req.body;
  try {
    const response = await createPokemonDB(
      name,
      image,
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      typeIds
    );
    console.log('Pokemon created:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error in createPokemonHandler:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDetailHandler,
  getPokemonHandler,
  createPokemonHandler,
};
