const Knex = require('knex');
require('dotenv').config();

export default Knex({
  client: 'pg',
  connection: process.env.DATABASE_CONNECTION_URL,
  migrations: {
    directory: './lib/infra/database/migrations'
  }
});
