import { Post } from './Post';

/**
 * PostList Component
 * 
 * @param object props - Component props.
 * @returns HTML of posts
 */
export const PostList = props => {
	const { loading = false, posts = []} = props;

	if (loading) {
		return <p className="post-list-loading">Loading posts...</p>;
	}

	if ( ! posts || posts.length < 1 ) {
		return <p className="post-list-none">No posts found, please try again.</p>
	}

	return (
		<div className="post-list">
			{posts.map((post) => <Post key={post.id} {...post}  />)}
		</div>
	);
};