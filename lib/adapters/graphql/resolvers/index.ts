import postResolver from './postResolver';

const resolvers = {
  Query: {
    ...postResolver.Query,
  }
};

export { resolvers };
