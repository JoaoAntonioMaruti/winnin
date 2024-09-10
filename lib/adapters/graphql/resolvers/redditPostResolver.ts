import { listRedditPost } from '@usecases/redditPost/loader'

interface RedditPostArgs {
  startDate: string | Date
  endDate: string | Date
  sortBy: 'ups' | 'comments'
}

interface RedditAuthorArgs {
  sortBy: 'ups' | 'comments'
}

const postResolver = {
  Query: {
    posts: async (_: undefined, params: RedditPostArgs) => {
      const { startDate, endDate } = params
      const dateParams = {
        start: new Date(startDate),
        end: new Date(endDate)
      }

      const normalizedParams = _normalizeParams({
        ...params,
        ...dateParams
      })
      const posts = await listRedditPost(normalizedParams)

      return posts;
    },

    authors: async (_: undefined, { sortBy }: RedditAuthorArgs) => {
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

function _normalizeParams(params: RedditPostArgs) {
  const normalizedSortBy = params.sortBy === 'comments' ? 'comments_count' : 'ups';

   return {
    ...params,
    sortBy: normalizedSortBy
  };
}

export default postResolver;
