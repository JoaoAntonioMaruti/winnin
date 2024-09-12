import PgBoss from 'pg-boss';
import config from '@lib/config';
import logger from '@infra/logger';

const boss = new PgBoss(config.databaseConnectionUrl);

interface TaskArgs {
  subreddit: string
}

async function redditPostQueue(taskName: string, taskArgs: TaskArgs) {
  try {
    await boss.start();
    _createQueue(taskName, boss)
    boss.send(taskName, taskArgs);
    logger.info('Task send to Queue');
    await boss.stop()
    return 'Done';
  } catch (error) {
    logger.error('Error to send Task to Queue:', error);
  }
}

async function _createQueue(taskName: string, bossInstance: PgBoss) {
  const queue = await bossInstance.createQueue(taskName);
  return queue;
}

export { redditPostQueue };
