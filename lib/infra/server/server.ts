import logger from 'infra/logger';
import { ApolloServer } from '@apollo/server';
import { config } from 'config';
import { resolvers } from 'adapters/graphql/resolvers';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from 'adapters/graphql/schemas';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const port = config.appPort as number
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  logger.info(`GraphQL server running on ${url}`);
})();
