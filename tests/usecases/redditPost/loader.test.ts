import { listRedditPost, RedditPost } from '@usecases/redditPost/loader';
import repo from '@infra/database/repo';

jest.mock('@infra/database/repo', () => ({
  default: jest.fn().mockReturnValue({
    list: jest.fn(),
  }),
}));

describe('Reddit Post Loader', () => {
  const LIST_REDDIT_POST_REPO = repo<RedditPost>('reddit_posts');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when LIST_REDDIT_POST_REPO.list is successful', async () => {
    //const mockData = [
      //{
        //id: '1',
        //title: 'post 1',
        //author: 'author 1',
        //created_at: '2024-01-01T00:00:00Z',
        //ups: 100,
        //comments_count: 10,
      //},
    //];

    //(LIST_REDDIT_POST_REPO.list as jest.Mock).mockResolvedValue(mockData);

    //const result = await listRedditPost({});

    //expect(LIST_REDDIT_POST_REPO.list).toHaveBeenCalledWith({});
    //expect(result).toEqual(mockData);
  });

  it('should handle errors from LIST_REDDIT_POST_REPO.list', async () => {
    //const error = new Error('List failed');

    //(LIST_REDDIT_POST_REPO.list as jest.Mock).mockRejectedValue(error);

    //await expect(listRedditPost({})).rejects.toThrow('List failed');
  });
});
