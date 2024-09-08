import PgBoss from 'pg-boss';
import { fetchRedditDataUseCase } from '../useCases/fetchRedditDataUseCase';
import { config } from './../config'

const boss = new PgBoss(config.databaseConnectionUrl);

const processRedditTask = async () => {
  console.log('Iniciando consulta à API do Reddit');
  const data = await fetchRedditDataUseCase();
  return data
  };

const addTaskToQueue = async () => {
  await boss.send('redditTask', { message: 'Fetch Reddit API' });
  console.log('Task added on Queue');
};

const processJob = async (job: any) => {
  console.log('Processing Task:', job.data);
  await processRedditTask();
};

(async () => {
  await boss.start();
  await boss.work('redditTask', processJob);
})();

process.on('SIGINT', async () => {
  await boss.stop();
  process.exit(0);
});

export { addTaskToQueue };
