const postResolver = {
  Query: {
    posts: () => {
      return [];
    },
  },
  Mutation: {
    createPost: (_parent: any, args: any) => {
      return {
        id: '1',
        title: args.title,
        author: args.author,
        createdAt: new Date().toISOString(),
        ups: 0,
        comments: 0,
      };
    },
  },
};

export default postResolver;
