import logger from 'infra/logger';
import config from 'config';
import { resolvers } from 'adapters/graphql/resolvers';
import { typeDefs } from 'adapters/graphql/schemas';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default async function startServer() {
  const port = config.appPort as number
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  logger.info(`GraphQL server running on ${url}`);
}
