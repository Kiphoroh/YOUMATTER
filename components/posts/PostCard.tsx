
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Post, Comment } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { ChartBarIcon } from '../../constants';

const CommentSection: React.FC<{ 
  comments: Comment[]; 
  onAddComment: (content: string) => void; 
}> = ({ comments, onAddComment }) => {
  const { user } = useAuth();
  const [commentContent, setCommentContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    onAddComment(commentContent);
    setCommentContent('');
  };

  return (
    <div className="mt-4 pt-4 border-t border-base-300 dark:border-gray-700">
      {/* Add comment form */}
      {user && (
        <form onSubmit={handleSubmit} className="flex items-start space-x-2 mb-4">
          <Avatar src={user.avatar} alt={user.name} size="sm" isOnline={user.isOnline} />
          <div className="flex-1">
            <input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-primary focus:border-primary px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
              placeholder="Write a comment..."
            />
          </div>
          <Button type="submit" size="sm" disabled={!commentContent.trim()}>Reply</Button>
        </form>
      )}

      {/* Display comments */}
      <div className="space-y-3">
        {comments.map(comment => (
          <div key={comment.id} className="flex items-start space-x-2">
            <Link to={`/profile/${comment.author.id}`}>
              <Avatar src={comment.author.avatar} alt={comment.author.name} size="sm" isOnline={comment.author.isOnline} />
            </Link>
            <div className="bg-base-200 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm flex-1">
              <Link to={`/profile/${comment.author.id}`} className="font-bold text-gray-800 dark:text-gray-200 hover:underline">{comment.author.name}</Link>
              <span className="text-gray-700 dark:text-gray-300 ml-1">{comment.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export const PostCard: React.FC<{ 
  post: Post;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onShare: (post: Post) => void;
  onViewPost: (postId: string) => void;
  onShowAnalytics: (post: Post) => void;
}> = ({ post, onLike, onAddComment, onShare, onViewPost, onShowAnalytics }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const author = post.isAnonymous ? { name: 'Anonymous', avatar: 'https://i.pravatar.cc/150?u=anonymous', id: 'u5', isOnline: false } : post.author;
  const isLiked = user ? post.likedBy.includes(user.id) : false;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onViewPost(post.id);
          observer.unobserve(node); // Disconnect from this element to only fire once
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [post.id, onViewPost]);


  return (
    <div ref={cardRef}>
        <Card className="mb-6 animate-fade-in">
        <div className="flex items-center space-x-3 mb-4">
            <Link to={!post.isAnonymous ? `/profile/${author.id}` : '#'}>
              <Avatar src={author.avatar} alt={author.name} isOnline={author.isOnline} />
            </Link>
            <div>
            <p className="font-bold text-gray-900 dark:text-gray-100">
                {!post.isAnonymous ? (
                    <Link to={`/profile/${author.id}`} className="hover:underline">{author.name}</Link>
                ) : (
                    author.name
                )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
            </div>
            <span className="ml-auto bg-purple-100 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-primary/20 dark:text-purple-300">{post.category}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.media && <img src={post.media} alt="Post media" className="rounded-lg w-full object-cover max-h-96 mb-4" />}
        
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{post.likedBy.length} Likes</span>
            <button onClick={() => setShowComments(!showComments)} className="hover:underline">
            {post.comments.length} Comments
            </button>
            <span>{post.shares} Shares</span>
        </div>
        
        {/* Actions */}
        <div className="flex justify-around text-gray-500 dark:text-gray-400 border-t border-base-300 dark:border-gray-700 pt-3 mt-4">
            <button onClick={() => onLike(post.id)} className={`flex items-center space-x-2 hover:text-pink-500 transition-colors ${isLiked ? 'text-pink-500' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span>Like</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <span>Comment</span>
            </button>
            <button onClick={() => onShare(post)} className="flex items-center space-x-2 hover:text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
            <span>Share</span>
            </button>
            {user && user.id === post.author.id && !post.isAnonymous && (
              <button onClick={() => onShowAnalytics(post)} className="flex items-center space-x-2 hover:text-primary">
                <ChartBarIcon className="h-6 w-6" />
                <span>Analytics</span>
              </button>
            )}
        </div>
        
        {showComments && (
            <CommentSection 
                comments={post.comments} 
                onAddComment={(content) => onAddComment(post.id, content)} 
            />
        )}
        </Card>
    </div>
  );
};