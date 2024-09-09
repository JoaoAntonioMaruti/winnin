import dotenv from 'dotenv'

dotenv.config()

interface AppConfigInterface {
	databaseConnectionUrl: string
	appPort: number | string
}

const config: AppConfigInterface = {
	databaseConnectionUrl: process.env.DATABASE_CONNECTION_URL || '',
	appPort: process.env.APP_PORT || 4000
}

export { config }
