require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const config = {
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres',
  dialectOptions: {
    timezone: '-03:00',
  },
};

module.exports = config;