import { config } from './../../config'

export default {
  client: 'pg',
  connection: config.databaseConnectionUrl,
  migrations: {
    directory: './lib/infra/database/migrations'
  }
};
