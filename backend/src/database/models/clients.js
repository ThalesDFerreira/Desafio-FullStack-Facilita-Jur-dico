'use strict';
const { DataTypes } = require('sequelize');
const conn = require('../connection');

const Clients = conn.define(
  'Clients',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    coordinate_x: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coordinate_y: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Clients;