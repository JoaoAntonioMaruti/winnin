import logger from 'infra/logger';
import { fetchTopFromSub } from 'useCases/redditPost/fetchRedditDataUseCase';
import { insertAllRedditPosts } from 'useCases/redditPost/mutator';

interface RedditResponseData {
  author_fullname?: string;
  author?: string;
  title: string;
  comments_count: number;
  ups: number;
}

interface RedditResponseRow {
  data: RedditResponseData;
}

interface PipelineType {
  response?: any;
  rows?: RedditResponseRow[];
  toInsert?: any[];
  pipelineResult?: any;
  start: (subreddit: string) => Promise<PipelineType>;
  filterRedditResponse: () => Promise<PipelineType>;
  prepareToInsert: () => Promise<PipelineType>;
  insertAllRedditPosts: () => Promise<PipelineType>;
}

const pipe: PipelineType = {
  async start(subreddit: string) {
    try {
      this.response = await fetchTopFromSub(subreddit);
      logger.info('Fetched Reddit data successfully');
      return this;
    } catch (error) {
      logger.error('Failed to fetch Reddit data', error);
      throw error;
    }
  },

  async filterRedditResponse() {
    if (!this.response || !this.response.data) {
      logger.warn('No response data to filter');
      return this;
    }

    this.rows = this.response.data.children;
    logger.info('Filtered Reddit response successfully');
    return this;
  },

  async prepareToInsert() {
    if (!this.rows) {
      logger.warn('No rows to prepare');
      return this;
    }

    this.toInsert = this.rows.map(({ data }) => {
      const { author_fullname: author, title, ups, comments_count } = data;
      return {
        author,
        title,
        ups,
        comments_count,
      };
    });
    logger.info('Prepared data for insertion');
    return this;
  },

  async insertAllRedditPosts() {
    if (!this.toInsert) {
      logger.warn('No data to insert');
      return this;
    }

    logger.info(`Prepare to insert ${this.toInsert.length} Reddit posts`);
    this.pipelineResult = await insertAllRedditPosts(this.toInsert);
    logger.info('Inserted all Reddit posts successfully');
    return this;
  },
};

export default pipe;
export { PipelineType };

