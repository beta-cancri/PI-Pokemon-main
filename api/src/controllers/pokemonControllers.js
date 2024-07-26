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
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, sprites, types } = response.data;
    return {
      id,
      name,
      image: sprites.front_default,
      types: types.map((t) => t.type.name),
    };
  }
};

const getAllPokemons = async () => {
  try {
    const dbPokemons = await Pokemon.findAll({ include: Type });
    const formattedDbPokemons = dbPokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.Types.map((type) => type.name),
    }));
    console.log('All Pokemons from DB:', formattedDbPokemons);

    const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
    const apiPokemons = apiResponse.data.results;
    console.log('All Pokemons from API:', apiPokemons);

    const detailedApiPokemons = await Promise.all(
      apiPokemons.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        const { name, sprites, types } = detailResponse.data;
        return {
          name,
          image: sprites.front_default,
          types: types.map((t) => t.type.name),
        };
      })
    );

    const combinedPokemons = [...formattedDbPokemons, ...detailedApiPokemons];
    return combinedPokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw new Error('Failed to fetch pokemons');
  }
};

const fetchPokemonFromApiByName = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const { id, sprites, types } = response.data;
    return {
      id,
      name: response.data.name,
      image: sprites.front_default,
      types: types.map((t) => t.type.name),
    };
  } catch (error) {
    console.error('Error fetching Pokemon from API by name:', error.message);
    return null;
  }
};

const getPokemonByName = async (name) => {
  console.log(`Searching for Pokemon by name: ${name}`);
  const dbPokemon = await Pokemon.findAll({ where: { name }, include: Type });
  if (dbPokemon.length > 0) {
    console.log('Pokemon found by name in DB:', dbPokemon);
    return dbPokemon;
  } else {
    console.log('Pokemon not found in DB, searching in API...');
    const apiPokemon = await fetchPokemonFromApiByName(name);
    if (apiPokemon) {
      console.log('Pokemon found by name in API:', apiPokemon);
      return [apiPokemon];
    } else {
      throw new Error('Pokemon not found');
    }
  }
};

module.exports = {
  createPokemonDB,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
};
