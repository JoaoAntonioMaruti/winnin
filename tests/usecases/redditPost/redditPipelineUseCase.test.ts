import pipe from '@usecases/redditPost/redditPipelineUseCase';
import { fetchTopFromSub } from '@usecases/redditPost/fetchRedditDataUseCase';
import { insertAllRedditPosts } from '@usecases/redditPost/mutator';
import logger from '@infra/logger';

jest.mock('@usecases/redditPost/fetchRedditDataUseCase');
jest.mock('@usecases/redditPost/mutator');
jest.mock('@infra/logger');

describe('Reddit Pipeline', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully and go through the pipeline', async () => {

    (fetchTopFromSub as jest.Mock).mockResolvedValue({
      data: {
        children: [
          {
            data: {
              author_fullname: 'author1',
              title: 'title1',
              ups: 10,
              num_comments: 2,
            },
          },
        ],
      },
    });

    (insertAllRedditPosts as jest.Mock).mockResolvedValue('success');

    const result = await pipe
      .start('subreddit')
      .then((p) => p.filterRedditResponse())
      .then((p) => p.prepareToInsert())
      .then((p) => p.insertAllRedditPosts());

    expect(fetchTopFromSub).toHaveBeenCalledWith('subreddit');
    expect(logger.info).toHaveBeenCalledWith('Fetched Reddit data successfully');
    expect(result.toInsert).toEqual([
      { author: 'author1', title: 'title1', ups: 10, comments_count: 2 },
    ]);
    expect(insertAllRedditPosts).toHaveBeenCalledWith(result.toInsert);
  });

  it('should handle errors during fetching', async () => {
    (fetchTopFromSub as jest.Mock).mockRejectedValue(new Error('fetch error'));

    await expect(pipe.start('subreddit')).rejects.toThrow('fetch error');
    expect(logger.error).toHaveBeenCalledWith('Failed to fetch Reddit data', new Error('fetch error'));
  });

  it('should warn if no response data to filter', async () => {
    (fetchTopFromSub as jest.Mock).mockResolvedValue({});

    await pipe.start('subreddit').then((p) => p.filterRedditResponse());

    expect(logger.warn).toHaveBeenCalledWith('No response data to filter');
  });
});
