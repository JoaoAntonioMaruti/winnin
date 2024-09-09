import postResolver from './postResolver';

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...postResolver.Mutation,
  },
};

export { resolvers };
