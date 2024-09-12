import config from '@lib/config';
import cron from 'node-cron';
import { redditPostQueue } from '@infra/queue/redditPostQueue';
import { redditPostWorker } from '@infra/worker/redditPostWorker';

export default async function createCronSchedules(executeScheduledJobs = config.executeScheduledJobs) {
  return executeScheduledJobs
    ? cron.schedule(config.cronScheduleConfig, _redditTaskCron)
    : null;
}

async function _redditTaskCron() {
  const taskName = 'reddit-task';
  const taskArgs = { subreddit: 'artificial' }

  await redditPostWorker(taskName);
  await redditPostQueue(taskName, taskArgs);
}

