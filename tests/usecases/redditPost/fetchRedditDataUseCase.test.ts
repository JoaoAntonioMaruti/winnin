import { fetchTopFromSub } from '@usecases/redditPost/fetchRedditDataUseCase';
import { fetchJson } from '@utils/fetchUtils';

jest.mock('@utils/fetchUtils', () => ({
  fetchJson: jest.fn(),
}));

describe('fetchTopFromSub', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when fetchJson is successful', async () => {
    const mockData = { data: 'some data' };
    (fetchJson as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchTopFromSub('subreddit');
    expect(fetchJson).toHaveBeenCalledWith('https://api.reddit.com/r/subreddit/top');
    expect(result).toEqual(mockData);
  });

  it('should return null when fetchJson fails', async () => {
    (fetchJson as jest.Mock).mockRejectedValue(new Error('fetch error'));

    const result = await fetchTopFromSub('subreddit');
    expect(fetchJson).toHaveBeenCalledWith('https://api.reddit.com/r/subreddit/top');
    expect(result).toBeNull();
  });
});
