const { Pokemon, Type } = require('../db');
const axios = require('axios');

const createPokemonDB = async (name, image, health, attack, defense, speed, height, weight, typeIds) => {
  const newPokemon = await Pokemon.create({
    name,
    image,
    health,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  const types = await Type.findAll({ where: { id: typeIds } });
  await newPokemon.addTypes(types);

  console.log('Pokemon created in DB:', newPokemon);
  return newPokemon;
};

const getPokemonById = async (id, source) => {
  if (source === 'bdd') {
    const pokemon = await Pokemon.findByPk(id, { include: Type });
    if (!pokemon) throw new Error('Pokemon not found in the database');
    console.log('Pokemon found by ID:', pokemon);
    return pokemon;
  } else {
    console.log('Fetching Pokemon from API by ID:', id);
  }
};

const getAllPokemons = async () => {
  try {
    // Fetch Pokémons from database
    const dbPokemons = await Pokemon.findAll({ include: Type });
    const formattedDbPokemons = dbPokemons.map(pokemon => ({
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.Types.map(type => type.name)
    }));
    console.log('All Pokemons from DB:', formattedDbPokemons);

    // Fetch basic list of Pokémons from external API
    const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100'); // Adjust the limit as needed
    const apiPokemons = apiResponse.data.results;
    console.log('All Pokemons from API:', apiPokemons);

    // Fetch detailed data for each Pokémon from the API
    const detailedApiPokemons = await Promise.all(apiPokemons.map(async pokemon => {
      const detailResponse = await axios.get(pokemon.url);
      const { name, sprites, types } = detailResponse.data;
      return {
        name,
        image: sprites.front_default,
        types: types.map(t => t.type.name)
      };
    }));

    // Combine the API and DB Pokémon data
    const combinedPokemons = [...formattedDbPokemons, ...detailedApiPokemons];
    return combinedPokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw new Error('Failed to fetch pokemons');
  }
};

const getPokemonByName = async (name) => {
  const pokemon = await Pokemon.findAll({ where: { name }, include: Type });
  if (pokemon.length === 0) throw new Error('Pokemon not found');
  console.log('Pokemon found by name:', pokemon);
  return pokemon;
};

module.exports = {
  createPokemonDB,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
};
