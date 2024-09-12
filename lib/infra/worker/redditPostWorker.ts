import PgBoss from 'pg-boss';
import config from '@lib/config';
import logger from '@infra/logger';
import pipe, { PipelineType } from '@usecases/redditPost/redditPipelineUseCase'

const boss = new PgBoss(config.databaseConnectionUrl);

interface Job {
  data: {
    subreddit: string
  }
}

async function redditPostWorker(taskName: string) {
  await boss.start();

  boss.work(taskName, async ([job]: Job[]) => {
    const { subreddit } = job.data;

    await pipe
      .start(subreddit)
      .then((p: PipelineType) => p.filterRedditResponse())
      .then((p: PipelineType) => p.prepareToInsert())
      .then((p: PipelineType) => p.insertAllRedditPosts())
      .catch(error => logger.error('Pipeline Error:', error));
    return 'Done';
  });

  return boss;
}
export { redditPostWorker };
