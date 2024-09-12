import knex from "@infra/database/knexfile";
import logger from "@infra/logger";

async function main() {
  try {
    await knex.migrate.latest();
    logger.info('Migrations ran successfully.');
  } catch (error) {
    logger.error('Error running migrations:', error);
  } finally {
    await knex.destroy();
  }
}

main().catch(console.error).then(() => process.exit());
