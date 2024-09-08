import Knex from 'knex';
import { config } from './../../config';

interface InsertRepository<T> {
  insert(data: T): Promise<string>;
}

const knex = Knex(config.databaseConnectionUrl);

const createInsertRepository = <T>(tableName: string): InsertRepository<T> => {
  return {
    async insert(data: T): Promise<string> {
      try {
        const [id] = await knex(tableName).insert(data).returning('id');
        return id;
      } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
      }
    }
  };
};

export default createInsertRepository;
