import Knex from 'knex';
import { config } from 'config';
import logger from 'infra/logger';

interface InsertRepository<T> {
  insert(data: T): Promise<string>;
  insertAll(data: T[]): Promise<string[]>;
  list(options?: ListOptions): Promise<T[]>;
}

interface ListOptions {
  sortBy?: string;
  order?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}

const knex = Knex(config.databaseConnectionUrl);

const repository = <T>(tableName: string): InsertRepository<T> => {
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
        logger.error('Error inserting data:', error);
        throw error;
      }
    },

    async list(options?: ListOptions): Promise<T[]> {
      try {
        let query = knex(tableName).select('*');

        if (options?.startDate && options?.endDate) {
          query = query.whereBetween('created_at', [options.startDate, options.endDate]);
        }

        if (options?.sortBy) {
          query = query.orderBy(options.sortBy, options.order || 'desc');
        }

        const results = await query;
        return results;
      } catch (error) {
        logger.error('Error listing data:', error);
        throw error;
      }
    }
  };
};

export default repository;
