require('dotenv').config();

const { Sequelize } = require('sequelize');
const config = require('./configs/config');

const connection = new Sequelize(config);

module.exports = connection;