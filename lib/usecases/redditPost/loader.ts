import repo from 'infra/database/repo'

interface RedditPost {
	id: string
	title: string
	author: string
	created_at: string
	ups: number
	comments_count: number
}

const LIST_REDDIT_POST_REPO = repo<RedditPost>('reddit_posts');

const listRedditPost = async function(data: any) {
	const list = await LIST_REDDIT_POST_REPO.list(data)

	return list;
}

export { listRedditPost, RedditPost }
