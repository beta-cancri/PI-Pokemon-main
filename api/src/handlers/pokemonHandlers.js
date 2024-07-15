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
        res.status(200).json(pokemonByName);
      } else {
        const response = await getAllPokemons();
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'bdd' : 'api';
    try {
      const response = await getPokemonById(id, source);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const createPokemonHandler = async (req, res) => {
    const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, typeIds } = req.body;
    try {
      const response = await createPokemonDB(
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        typeIds
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getDetailHandler,
    getPokemonHandler,
    createPokemonHandler,
  };