import { fetchJson } from '../utils/fetchUtils';

const REDDIT_URL = 'https://api.reddit.com/r/artificial/hot';

export const fetchRedditDataUseCase = async () => {
  try {
    const data = await fetchJson(REDDIT_URL);
    if (data) {
      return data;
    }
  } catch (error) {
    return null;
  }
};
