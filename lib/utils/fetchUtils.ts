import logger from 'infra/logger';
import fetch from 'node-fetch';

export const fetchJson = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    logger.error('Error in fetchJson:', error);
    return null;
  }
};
