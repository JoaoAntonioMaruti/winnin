import createCronSchedules from 'infra/cron/cronJobs';
import startServer from 'infra/server/server';

startServer();
createCronSchedules();
