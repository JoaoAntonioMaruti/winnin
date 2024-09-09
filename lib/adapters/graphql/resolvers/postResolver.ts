import { listRedditPost } from 'core/domain/loader'

interface PostArgs {
  startDate: string
  endDate: string
  sortBy: 'ups' | 'comments_count'
}

interface AuthorArgs {
  sortBy: 'ups' | 'comments_count'
}

const postResolver = {
  Query: {
    posts: async (_: any, { sortBy, startDate, endDate }: PostArgs) => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const posts = await listRedditPost({sortBy, startDate: start, endDate: end})

      return posts;
    },

    authors: async (_: any, { sortBy }: AuthorArgs) => {
      const authors = await listRedditPost({
        selectFields: ['author'],
        groupBy: 'author',
        sumFields: [
          { field: 'ups', alias: 'total_ups' },
          { field: 'comments_count', alias: 'total_comments' }
        ],
        sortBy: sortBy === 'ups' ? 'total_ups' : 'total_comments',
        order: 'desc',
      });

      return authors;
    },

  }
};

export default postResolver;
