import PgBoss from 'pg-boss';
import config from 'config';
import pipe, { PipelineType } from 'useCases/redditPost/redditPipelineUseCase'
import logger from 'infra/logger';

const boss = new PgBoss(config.databaseConnectionUrl);

async function sendToQueue() {
  try {
    await boss.start();
    await boss.send('reddit-task', { subreddit: 'artificial' });
    logger.info('Task send to Queue');
  } catch (error) {
    logger.error('Error to send Task to Queue:', error);
  } finally {
    await boss.stop();
  }
}

async function worker() {
  try {
    await boss.start();

    boss.work('reddit-task', async ([job]: any) => {
      await pipe
        .start(job.data.subreddit)
        .then((p: PipelineType) => p.filterRedditResponse())
        .then((p: PipelineType) => p.prepareToInsert())
        .then((p: PipelineType) => p.insertAllRedditPosts())
        .catch(error => logger.error('Pipeline Error:', error));

      return 'Done';
    });
  } catch (error) {
    logger.error('Worker error:', error);
  }
}
export { worker, sendToQueue };
