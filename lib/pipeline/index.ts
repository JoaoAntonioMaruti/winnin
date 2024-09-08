//@ Fluent Interface design pattern
import logger from 'infra/logger'
import { fetchTopFromSub } from 'useCases/fetchRedditDataUseCase';
import { insertAllRedditPosts } from 'core/domain/mutator';

interface RedditResponseData {
  author_fullname?: string,
  author?: string,
  title: string,
  num_comments: number,
  ups: number
}

interface RedditResponseRow {
  data: RedditResponseData
}

interface PipelineType {
  response?: any,
  rows?: RedditResponseRow[],
  toInsert?: any,
  pipelineResult?: any,
  start: (subreddit: string) => Promise<PipelineType>;
  filterRedditResponse: () => Promise<PipelineType>;
  prepareToInsert: () => Promise<PipelineType>;
  insertAllREdditPosts: () => Promise<PipelineType>,
}

const pipe: PipelineType = {
  async start(subreddit: string) {
    this.response = await fetchTopFromSub(subreddit);
    return this;
  },

  async filterRedditResponse() {
    const { children } = this.response.data;
    this.rows = children;
    return this;
  },

  async prepareToInsert() {
    this.toInsert = this.rows?.map(({ data }: RedditResponseRow) => {
      const {author_fullname: author, title, ups, num_comments: comments_count} = data

      return {
        author,
        title,
        ups,
        comments_count
      }
    })
    return this;
  },

  async insertAllREdditPosts() {
    logger.info(`Prepare to insert ${this.toInsert.length} reddit posts`)

    this.pipelineResult = await insertAllRedditPosts(this.toInsert)
    return this;
  }
};

export default pipe;
export { PipelineType };
