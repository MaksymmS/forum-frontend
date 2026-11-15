import type { Category, Post } from '../types/post';
import { PostCard } from './PostCard';

type PostListProps = {
  posts: Post[];
  categories?: Category[];
};

export function PostList(props: PostListProps) {
  const { posts, categories } = props;

  const categoryMap = new Map<number, string>();
  categories?.forEach((cat) => {
    categoryMap.set(cat.id, cat.name);
  });

  if (posts.length === 0) {
    return <p className="no-posts">Постов пока нет...</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          categoryName={post.categoryId ? categoryMap.get(post.categoryId) : undefined}
        />
      ))}
    </div>
  );
}
