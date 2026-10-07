import React from 'react';
import type { Post } from '../types/post';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
    if (posts.length === 0) {
        return <p className="no-posts">No posts available</p>
    }

    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}