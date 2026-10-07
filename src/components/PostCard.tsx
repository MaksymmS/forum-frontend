import React from 'react';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <article className="post-card">
            <div className="post-header">
                {post.category && <span className="post-category">{post.category}</span>}
                <span className="post-date">{formattedDate}</span>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>

            <div className="post-footer">
                <span className="post-author"><strong>{post.author || 'Anonymous'}</strong></span>
            </div>
        </article>
    )
}