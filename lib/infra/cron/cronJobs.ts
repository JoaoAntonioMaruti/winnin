import config from '@lib/config';
import cron from 'node-cron';
import logger from '@infra/logger';
import { redditPostQueue } from '@infra/queue/redditPostQueue';
import { redditPostWorker } from '@infra/worker/redditPostWorker';

export default async function createCronSchedules(executeScheduledJobs = config.executeScheduledJobs) {
  if (executeScheduledJobs) {
    cron.schedule('0 0 * * *', async () => {
      redditPostWorker();

      await redditPostQueue();
    });
    return
  }

  logger.warn("Cron job bypass");
  return
}

