import PgBoss from 'pg-boss';
import { config } from 'config';
import { insertRedditPost } from 'core/domain/mutator';

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

    boss.work('reddit-task', async ([job]: any) => {
      const redditResponse = await fetchTopFromSub(job.data.subreddit)

      console.log(redditResponse)

      const data = {
        title: 'New Reddit Post',
        author: 'author_name',
        created_at: new Date(),
        ups: 10,
        comments_count: 2
      }

      insertRedditPost(data)


      return 'Done';
    });
  } catch (error) {
    console.error('Worker error:', error);
  }
}
export { worker, sendToQueue };
