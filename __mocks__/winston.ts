const format = {
  colorize: jest.fn(),
  combine: jest.fn().mockReturnValue({
    timestamp: jest.fn(),
    printf: jest.fn()
  }),
  label: jest.fn(),
  timestamp: jest.fn(),
  printf: jest.fn()
};

const transports = {
  Console: jest.fn(),
  File: jest.fn()
};

const createLogger = jest.fn(() => ({
  level: 'info',
  format: format,
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
}));

const winston = {
  format,
  transports,
  createLogger
};

export default winston;

