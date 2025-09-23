import React from 'react';
import { Post } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';

const PostActions: React.FC = () => (
    <div className="flex justify-around text-gray-500 dark:text-gray-400 border-t border-base-300 dark:border-gray-700 pt-3 mt-4">
        <button className="flex items-center space-x-2 hover:text-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span>Like</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
            <span>Share</span>
        </button>
    </div>
);

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const author = post.isAnonymous ? { name: 'Anonymous', avatar: 'https://i.pravatar.cc/150?u=anonymous' } : post.author;

  return (
    <Card className="mb-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar src={author.avatar} alt={author.name} />
        <div>
          <p className="font-bold text-gray-900 dark:text-gray-100">{author.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
        </div>
        <span className="ml-auto bg-purple-100 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-primary/20 dark:text-purple-300">{post.category}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
      {post.media && <img src={post.media} alt="Post media" className="rounded-lg w-full object-cover max-h-96 mb-4" />}
      
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{post.likes} Likes</span>
        <span>{post.comments.length} Comments</span>
        <span>{post.shares} Shares</span>
      </div>

      <PostActions />
      
      {post.comments.length > 0 && (
        <div className="mt-4 space-y-3">
            {post.comments.slice(0,2).map(comment => (
                 <div key={comment.id} className="flex items-start space-x-2">
                     <Avatar src={comment.author.avatar} alt={comment.author.name} size="sm" />
                     <div className="bg-base-200 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm flex-1">
                         <span className="font-bold text-gray-800 dark:text-gray-200">{comment.author.name} </span>
                         <span className="text-gray-700 dark:text-gray-300">{comment.content}</span>
                     </div>
                 </div>
            ))}
        </div>
      )}
    </Card>
  );
};
