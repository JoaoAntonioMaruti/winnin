const mockStart = jest.fn();
const mockWork = jest.fn();
const mockStop = jest.fn();
const mockShutdown = jest.fn();
const mockQueue = jest.fn();

const PgBoss = jest.fn().mockImplementation(() => ({
  start: mockStart,
  work: mockWork,
  stop: mockStop,
  shutdown: mockShutdown,
  queue: mockQueue,
}));

PgBoss.prototype.start = mockStart;
PgBoss.prototype.work = mockWork;
PgBoss.prototype.stop = mockStop;
PgBoss.prototype.shutdown = mockShutdown;
PgBoss.prototype.queue = mockQueue;

export default PgBoss;
export {
  mockStart,
  mockWork,
  mockStop,
  mockShutdown,
  mockQueue
};
