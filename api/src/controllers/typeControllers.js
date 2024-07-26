const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async () => {
  const typesInDb = await Type.findAll();
  if (typesInDb.length === 0) {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const types = response.data.results.map((type) => ({ name: type.name }));
    await Type.bulkCreate(types);
    return types;
  }
  return typesInDb;
};

module.exports = { getAllTypes };
