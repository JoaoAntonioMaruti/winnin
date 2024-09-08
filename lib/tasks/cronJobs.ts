import cron from 'node-cron';
import { addTaskToQueue } from './taksHandler';

cron.schedule("*/10 * * * * *", function() {
  addTaskToQueue();
});

