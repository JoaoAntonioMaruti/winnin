import cron from 'node-cron';
import createCronSchedules from '@infra/cron/cronJobs';
import logger from '@infra/logger';

jest.mock('node-cron');
jest.mock('pg-boss');
jest.mock('@infra/logger');

describe('createCronSchedules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should schedule a cron job when executeScheduledJobs is true', async () => {
    await createCronSchedules(true);

    expect(cron.schedule).toHaveBeenCalledWith("0 0 * * *", expect.any(Function));
  });

  it('should log a warning and not schedule a cron job when executeScheduledJobs is false', async () => {
    await createCronSchedules(false);

    expect(cron.schedule).not.toHaveBeenCalled();

    expect(logger.warn).toHaveBeenCalledWith("Cron job bypass");
  });
});
