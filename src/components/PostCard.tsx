import type { Post } from '../types/post';

type PostCardProps = {
  post: Post;
};

export function PostCard(props: PostCardProps) {
    const { post } = props;

    const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <article className="post-card">
        <div className="post-header">
            {post.category && <span className="post-category">{post.category}</span>}
            <span className="post-date">{formattedDate}</span>
        </div>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div className="post-footer">
            <span className="post-author">
            Author: <strong>{post.author || 'Anonymous'}</strong>
            </span>
        </div>
        </article>
  );
}