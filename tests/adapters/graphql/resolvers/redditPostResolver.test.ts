import { listRedditPost } from '@usecases/redditPost/loader';
import postResolver from '@adapters/graphql/resolvers/redditPostResolver';

jest.mock('@usecases/redditPost/loader');

describe('postResolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('posts', () => {
    it('should fetch posts', async () => {
      const mockPosts = [{ id: 1, title: 'Test Post', ups: 10, comments_count: 5 }];
      (listRedditPost as jest.Mock).mockResolvedValue(mockPosts);

      const startDate = '2024-01-01T00:00:00Z';
      const endDate = '2024-01-02T00:00:00Z';
      const sortBy = 'ups';

      const result = await postResolver.Query.posts(undefined, { startDate, endDate, sortBy });

      expect(result).toEqual(mockPosts);
    });
  });

  describe('authors', () => {
    it('should fetch authors with proper aggregation and sorting', async () => {
      const mockAuthors = [{ author: 'Author1', total_ups: 100, total_comments: 50 }];
      (listRedditPost as jest.Mock).mockResolvedValue(mockAuthors);

      const sortBy = 'ups';

      const result = await postResolver.Query.authors(undefined, { sortBy });

      expect(listRedditPost).toHaveBeenCalledWith({
        selectFields: ['author'],
        groupBy: 'author',
        sumFields: [
          { field: 'ups', alias: 'total_ups' },
          { field: 'comments_count', alias: 'total_comments' }
        ],
        sortBy: 'total_ups',
        order: 'desc',
      });

      expect(result).toEqual(mockAuthors);
    });

    it('should sort authors by comments when sortBy is comments', async () => {
      const mockAuthors = [{ author: 'Author2', total_ups: 50, total_comments: 150 }];
      (listRedditPost as jest.Mock).mockResolvedValue(mockAuthors);

      const sortBy = 'comments';

      const result = await postResolver.Query.authors(undefined, { sortBy });

      expect(listRedditPost).toHaveBeenCalledWith({
        selectFields: ['author'],
        groupBy: 'author',
        sumFields: [
          { field: 'ups', alias: 'total_ups' },
          { field: 'comments_count', alias: 'total_comments' }
        ],
        sortBy: 'total_comments',
        order: 'desc',
      });

      expect(result).toEqual(mockAuthors);
    });
  });
});
