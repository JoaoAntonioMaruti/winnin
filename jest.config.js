module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@infra/(.*)$': '<rootDir>/lib/infra/$1',
    '^@usecases/(.*)$': '<rootDir>/lib/usecases/$1',
    '^@core/(.*)$': '<rootDir>/lib/core/$1',
    '^@config/(.*)$': '<rootDir>/lib/config/$1',
    '^@adapters/(.*)$': '<rootDir>/lib/adapters/$1',
    '^@utils/(.*)$': '<rootDir>/lib/utils/$1',
    '^winston$': '<rootDir>/__mocks__/winston.ts',
    '^lib/infra/logger$': '<rootDir>/__mocks__/lib/infra/logger.ts'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
