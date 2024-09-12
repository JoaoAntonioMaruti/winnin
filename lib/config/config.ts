import dotenv from 'dotenv';

dotenv.config();

interface AppConfigInterface {
	databaseConnectionUrl: string
	appPort: number | string,
	executeScheduledJobs: boolean,
	cronScheduleConfig: string
}

const config: AppConfigInterface = {
	databaseConnectionUrl: process.env.DATABASE_CONNECTION_URL || '',
	appPort: process.env.APP_PORT || 4000,
	executeScheduledJobs: true,
	cronScheduleConfig: process.env.CRON_SCHEDULE_CONFIG || '0 0 * * *'
}

export default config;
