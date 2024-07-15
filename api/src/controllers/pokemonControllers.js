// controllers/pokemonControllers.js
const { Pokemon, Type } = require('../db');

const createPokemonDB = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, typeIds) => {
  const newPokemon = await Pokemon.create({
    nombre,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
  });

  const types = await Type.findAll({ where: { id: typeIds } });
  await newPokemon.addTypes(types);

  return newPokemon;
};

const getPokemonById = async (id, source) => {
  if (source === 'bdd') {
    const pokemon = await Pokemon.findByPk(id, { include: Type });
    if (!pokemon) throw new Error('Pokemon not found in the database');
    return pokemon;
  } else {
    // Logic to fetch from API
  }
};

const getAllPokemons = async () => {
  const pokemons = await Pokemon.findAll({ include: Type });
  return pokemons;
};

const getPokemonByName = async (name) => {
  const pokemon = await Pokemon.findAll({ where: { nombre: name }, include: Type });
  if (pokemon.length === 0) throw new Error('Pokemon not found');
  return pokemon;
};

module.exports = {
  createPokemonDB,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
};
