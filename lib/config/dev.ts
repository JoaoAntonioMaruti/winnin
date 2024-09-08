import dotenv from 'dotenv'

dotenv.config()

const config = {
	databaseConnectionUrl: process.env.DATABASE_CONNECTION_URL || ''
}

export { config }
