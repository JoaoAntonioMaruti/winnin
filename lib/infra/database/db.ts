import knex from 'knex';
import knexfile from '@infra/database/knexfile';

const db = knex(knexfile);

export default db;
