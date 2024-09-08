import repo from './../../infra/database/repo'

const INSERT_REDDIT_POST_REPO = repo<any>('reddit_posts');

const insertRedditPost = async function(data: any) {
  //@TODO - implements schema validations
	await INSERT_REDDIT_POST_REPO.insert(data)
}

export { insertRedditPost }
