import cron from 'node-cron';
import { sendToQueue, worker } from './taksHandler';

//@TODO - 1 x per day
cron.schedule("*/10 * * * * *", async function () {
  worker();

  await sendToQueue();
});

