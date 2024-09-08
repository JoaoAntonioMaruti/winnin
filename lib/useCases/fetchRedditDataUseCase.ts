import { fetchJson } from '../utils/fetchUtils';

const REDDIT_URL = 'https://api.reddit.com/r/artificial/hot';

export const fetchRedditDataUseCase = async () => {
  try {
    const data = await fetchJson(REDDIT_URL);
    if (data) {
      console.log('Dados recebidos do Reddit:', data);
      return data;
    }
  } catch (error) {
    console.error('Erro ao buscar dados no Use Case:', error);
    return null;
  }
};
