const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Patient = sequelize.define('Patient', {
  whatsapp_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Patient;