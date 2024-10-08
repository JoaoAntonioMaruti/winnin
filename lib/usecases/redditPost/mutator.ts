import repo from '@infra/database/repo'

const INSERT_REDDIT_POST_REPO = repo<any>('reddit_posts');

const insertRedditPost = async function(data: any) {
	await INSERT_REDDIT_POST_REPO.insert(data)
}

const insertAllRedditPosts = async function(data: any) {
	await INSERT_REDDIT_POST_REPO.insertAll(data)
}

export { insertRedditPost, insertAllRedditPosts }
