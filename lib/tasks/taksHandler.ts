import PgBoss from 'pg-boss';
import { config } from './../config';

import { fetchTopFromSub } from './../useCases/fetchRedditDataUseCase'

const boss = new PgBoss(config.databaseConnectionUrl);

async function sendToQueue() {
  try {
    await boss.start();
    await boss.send('reddit-task', { subreddit: 'artificial' });
    console.log('Task send to Queue');
  } catch (error) {
    console.error('Error to send Task to Queue:', error);
  } finally {
    await boss.stop();
  }
}

async function worker() {
  try {
    await boss.start();

    boss.work('reddit-task', async (job: any) => {
      await fetchTopFromSub(job.data.subreddit)
      return 'Done';
    });
  } catch (error) {
    console.error('Worker error:', error);
  }
}
export { worker, sendToQueue };
