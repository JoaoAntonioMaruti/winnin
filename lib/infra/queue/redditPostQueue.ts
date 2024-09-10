import PgBoss from 'pg-boss';
import config from '@lib/config';
import logger from '@infra/logger';

const boss = new PgBoss(config.databaseConnectionUrl);

async function redditPostQueue() {
  try {
    await boss.start();
    await boss.send('reddit-post-task', { subreddit: 'artificial' });
    logger.info('Task send to Queue');
  } catch (error) {
    logger.error('Error to send Task to Queue:', error);
  } finally {
    await boss.stop();
  }
}

export { redditPostQueue };
