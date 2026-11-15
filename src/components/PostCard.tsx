import type { Post } from '../types/post';

type PostCardProps = {
  post: Post;
  categoryName?: string;
};

export function PostCard(props: PostCardProps) {
  const { post, categoryName } = props;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const displayedCategory =
    post.category || categoryName || (post.categoryId ? `Category #${post.categoryId}` : undefined);
  const displayedAuthor = post.author || (post.authorId ? `User #${post.authorId}` : 'Anonymous');

  return (
    <article className="post-card">
      <div className="post-header">
        {displayedCategory && <span className="post-category">{displayedCategory}</span>}
        {formattedDate && <span className="post-date">{formattedDate}</span>}
      </div>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <span className="post-author">
          Author: <strong>{displayedAuthor}</strong>
        </span>
      </div>
    </article>
  );
}
