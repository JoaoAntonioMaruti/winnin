import Knex from 'knex';
import config from '@lib/config';
import logger from '@infra/logger';

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
  groupBy?: string;
  selectFields?: string[];
  sumFields?: { field: string, alias: string }[];
}

const knex = Knex(config.databaseConnectionUrl);

const repository = <T>(tableName: string, knexInstance: any = knex): InsertRepository<T> => {
  return {
    async insert(data: T): Promise<string> {
      try {
        const toInsert = {
          ...data,
          created_at: new Date()
        }
        const [id] = await knexInstance(tableName).insert(toInsert).returning('id');
        return id;
      } catch (error) {
        logger.error('Error inserting data:', error);
        throw error;
      }
    },

    async insertAll(data: T[]): Promise<string[]> {
      try {
        const toInsert = data.map((row) => {
          return {...row, created_at: new Date()}
        })

        const ids = await knexInstance(tableName).insert(toInsert).returning('id');
        return ids;
      } catch (error) {
        logger.error('Error inserting data:', error);
        throw error;
      }
    },

     async list(options?: ListOptions): Promise<T[]> {
      try {
        let query = knexInstance(tableName).select(options?.selectFields || '*');

        if (options?.sumFields) {
          options.sumFields.forEach(({ field, alias }) => {
            query = query.sum({ [alias]: field });
          });
        }

        if (options?.groupBy) {
          query = query.groupBy(options.groupBy);
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
    },
  };
};

export { ListOptions }
export default repository;
