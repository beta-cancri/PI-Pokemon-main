const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health: {
      type: DataTypes.FLOAT, // Changed to FLOAT
      allowNull: false,
    },
    attack: {
      type: DataTypes.FLOAT, // Changed to FLOAT
      allowNull: false,
    },
    defense: {
      type: DataTypes.FLOAT, // Changed to FLOAT
      allowNull: false,
    },
    speed: {
      type: DataTypes.FLOAT, // Changed to FLOAT
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT, // Changed to FLOAT
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT, // Changed to FLOAT
      allowNull: true,
    },
    created: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
  });
};
