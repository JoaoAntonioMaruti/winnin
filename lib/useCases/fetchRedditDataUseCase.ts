import { fetchJson } from '../utils/fetchUtils';

const REDDIT_BASE_URL = 'https://api.reddit.com';

export const fetchTopFromSub = async (subreddit: string) => {
  try {
    const data = await fetchJson(`${REDDIT_BASE_URL}/r/${subreddit}/top`);
    if (data) {
      return data;
    }
  } catch (error) {
    return null;
  }
};
