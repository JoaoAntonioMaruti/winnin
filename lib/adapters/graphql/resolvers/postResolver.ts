import { listRedditPost } from 'core/domain/loader'

interface PostArgs {
  startDate: string
  endDate: string
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
  }
};

export default postResolver;
