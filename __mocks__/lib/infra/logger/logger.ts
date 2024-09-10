import winston from 'winston';

const mockLogger = {
  level: 'info',
  format: winston.format,
  transports: [
    { filename: 'logs/error.log', level: 'error' },
    { filename: 'logs/combined.log' }
  ],
  debug: jest.fn(),
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn()
};

export default mockLogger;

