import PgBoss from 'pg-boss';
import { redditPostWorker } from '@infra/worker/redditPostWorker';
import pipe, { PipelineType } from '@usecases/redditPost/redditPipelineUseCase';

jest.mock('@usecases/redditPost/redditPipelineUseCase');
jest.mock('@infra/logger');

const mockPipeline: PipelineType = {
  start: jest.fn().mockResolvedValueOnce({}),
  filterRedditResponse: jest.fn().mockResolvedValueOnce({}),
  prepareToInsert: jest.fn().mockResolvedValueOnce({}),
  insertAllRedditPosts: jest.fn().mockResolvedValueOnce('Done')
};

pipe.start = jest.fn().mockResolvedValue(mockPipeline);

describe('redditPostWorker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should start PgBoss and work on the "reddit-task" queue', async () => {
    const taskName = 'reddit-task';
    await redditPostWorker(taskName);

    expect(PgBoss.prototype.start).toHaveBeenCalled();

    const mockWork: any = PgBoss.prototype.work

    expect(mockWork).toHaveBeenCalledWith(taskName, expect.any(Function));

    const job = { data: { subreddit: 'test-subreddit' } };
    const workerFunction = mockWork.mock.calls[0][1];
    await workerFunction([job]);

    expect(pipe.start).toHaveBeenCalledWith('test-subreddit');
  });
});
