import Knex from 'knex';
import { config } from 'config';

interface InsertRepository<T> {
  insert(data: T): Promise<string>;
  insertAll(data: T[]): Promise<string[]>;
}

const knex = Knex(config.databaseConnectionUrl);

const createInsertRepository = <T>(tableName: string): InsertRepository<T> => {
  return {
    async insert(data: T): Promise<string> {
      try {
        const toInsert = {
          ...data,
          created_at: new Date()
        }
        const [id] = await knex(tableName).insert(toInsert).returning('id');
        return id;
      } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
      }
    },

    async insertAll(data: T[]): Promise<string[]> {
      try {
        const toInsert = data.map((row) => {
          return {...row, created_at: new Date()}
        })

        const ids = await knex(tableName).insert(toInsert).returning('id');
        return ids;
      } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
      }
    }
  };
};
export default createInsertRepository;
