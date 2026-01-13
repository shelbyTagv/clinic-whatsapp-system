const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Add this line

const Appointment = sequelize.define('Appointment', {
  appointment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time_slot: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Booked', 'Confirmed', 'Cancelled', 'No-show'),
    defaultValue: 'Booked' 
  },
  internal_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  
  indexes: [
    {
      unique: true,
      fields: ['appointment_date', 'time_slot']
    }
  ]
});

module.exports = Appointment;