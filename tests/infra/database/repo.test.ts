import * as mockKnex from 'mock-knex';
import Knex from 'knex';
import repository, { ListOptions } from '@infra/database/repo';

jest.mock('@infra/logger');

const tracker = mockKnex.getTracker();

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: ':memory:',
  },
  useNullAsDefault: true,
});

describe('Repository', () => {
  const repo = repository('users', knex);

  beforeAll(async () => {
    tracker.install();
    await knex.schema.createTable('users', (table: any) => {
      table.increments('id');
      table.string('name');
      table.integer('age');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });

  afterAll(() => {
    tracker.uninstall();
  });

  beforeEach(() => {
    tracker.on('query', (query: any) => {
      if (query.method === 'insert') {
        query.response([1]);
      } else if (query.method === 'select') {
        query.response([{ id: 1, name: 'João Milagres', age: 30, created_at: new Date() }]);
      }
    });
  });

  it('should insert data and return an id', async () => {
    const mockData = { name: 'João Milagres', age: 30 };

    const {id: id} : any = await repo.insert(mockData);

    expect(id).toBe(1);
  });

  it('should handle errors on insert', async () => {
    const mockData = { invalid_data: 'some_value' };

    expect(repo.insert(mockData)).rejects.toThrow();
  });

  it('should insert multiple data and return ids', async () => {
    const mockData = [{ name: 'João Milagres', age: 30 }, { name: 'Milena Kazume', age: 25 }];

    const ids = await repo.insertAll(mockData);

    expect(ids).toEqual([{id: 1}, {id: 2}]);
  });

  it('should handle errors on insertAll', async () => {
    const mockData = [{ invalid_data: 'some_value' }];

    expect(repo.insertAll(mockData)).rejects.toThrow();
  });

  it('should list data with optional filters', async () => {
    const options: ListOptions = {
      selectFields: ['name', 'age'],
      sortBy: 'age',
      order: 'asc'
    };

    const mockData = { name: 'João Milagres', age: 25 };

    await repo.insert(mockData);

    const results = await repo.list(options);
    expect(results).toHaveLength(1);

    const result: any = results[0];

    expect(result.name).toEqual(mockData.name)
    expect(result.age).toEqual(mockData.age)
  });
});

