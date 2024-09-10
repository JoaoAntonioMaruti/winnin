import { insertRedditPost, insertAllRedditPosts } from '@usecases/redditPost/mutator';
import repo from '@infra/database/repo';

jest.mock('@infra/database/repo', () => ({
  default: jest.fn().mockReturnValue({
    insert: jest.fn(),
    insertAll: jest.fn(),
  }),
}));

describe('Reddit Post Mutator', () => {
  const INSERT_REDDIT_POST_REPO = repo<any>('reddit_posts');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call INSERT_REDDIT_POST_REPO.insert with correct data', async () => {
    const data = { title: 'test post', author: 'test author' };

    await insertRedditPost(data);

    expect(INSERT_REDDIT_POST_REPO.insert).toHaveBeenCalledWith(data);
    expect(INSERT_REDDIT_POST_REPO.insert).toHaveBeenCalledTimes(1);
  });

  it('should call INSERT_REDDIT_POST_REPO.insertAll with correct data', async () => {
    const data = [
      { title: 'test post 1', author: 'test author 1' },
      { title: 'test post 2', author: 'test author 2' },
    ];

    await insertAllRedditPosts(data);

    expect(INSERT_REDDIT_POST_REPO.insertAll).toHaveBeenCalledWith(data);
    expect(INSERT_REDDIT_POST_REPO.insertAll).toHaveBeenCalledTimes(1);
  });

  it('should handle errors from INSERT_REDDIT_POST_REPO.insert', async () => {
    const data = { title: 'test post', author: 'test author' };
    const error = new Error('Insert failed');

    (INSERT_REDDIT_POST_REPO.insert as jest.Mock).mockRejectedValue(error);

    await expect(insertRedditPost(data)).rejects.toThrow('Insert failed');
  });

  it('should handle errors from INSERT_REDDIT_POST_REPO.insertAll', async () => {
    const data = [
      { title: 'test post 1', author: 'test author 1' },
      { title: 'test post 2', author: 'test author 2' },
    ];
    const error = new Error('InsertAll failed');

    (INSERT_REDDIT_POST_REPO.insertAll as jest.Mock).mockRejectedValue(error);

    await expect(insertAllRedditPosts(data)).rejects.toThrow('InsertAll failed');
  });
});

