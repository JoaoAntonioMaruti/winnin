import Knex from 'knex';
require('dotenv').config();
import url from 'url';

function getDatabaseName(connectionUrl: string) {
  const parsedUrl = new url.URL(connectionUrl);
  return parsedUrl.pathname.substring(1);
}

async function createDatabase() {
  const connectionUrl = process.env.DATABASE_CONNECTION_URL;
  if (!connectionUrl) {
    throw new Error('DATABASE_CONNECTION_URL is not set in environment variables.');
  }

  const dbName = getDatabaseName(connectionUrl);
  const baseConnectionUrl = connectionUrl.replace(`/${dbName}`, '');

  const knex = Knex({
    client: 'pg',
    connection: baseConnectionUrl,
  });

  try {
    const { rows } = await knex.raw(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    const dbExists =  !!rows[0]['?column?']
    if (dbExists) {
      console.log(`Database '${dbName}' already exists.`);
    }
  } catch (error: any) {
      await knex.raw(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created successfully.`);
  } finally {
    await knex.destroy();
  }
}

createDatabase().catch(console.error).then(() => process.exit());
