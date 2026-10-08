import type { Post } from '../types/post';
import { PostCard } from './PostCard';

type PostListProps = {
  posts: Post[];
};

export function PostList(props: PostListProps) {
    const { posts } = props;

    if (posts.length === 0) {
        return <p className="no-posts">Постов пока нет...</p>;
}

	return (
        <div className="post-list">
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
        </div>
  );
}