import redditPostResolver from './redditPostResolver';

const resolvers = {
  Query: {
    ...redditPostResolver.Query,
  }
};

export { resolvers };
