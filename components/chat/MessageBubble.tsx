
import React from 'react';
import { Link } from 'react-router-dom';
import { ChatMessage, Post } from '../../types';
import { useData } from '../../hooks/useData';
import { Avatar } from '../ui/Avatar';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  onViewPost?: (postId: string) => void;
}

const SharedPostPreview: React.FC<{ post: Post; onClick: () => void; }> = ({ post, onClick }) => {
    const author = post.isAnonymous ? { name: 'Anonymous', avatar: 'https://i.pravatar.cc/150?u=anonymous' } : post.author;
    return (
        <div onClick={onClick} className="mt-1 border-l-4 border-primary/50 pl-3 py-1 bg-black/5 dark:bg-white/5 rounded-r-lg cursor-pointer hover:bg-black/10 dark:hover:bg-white/10">
            {post.media && <img src={post.media} alt="Post media" className="rounded-md w-full object-cover max-h-32 mb-2" />}
            <div className="flex items-center space-x-2">
                <Avatar src={author.avatar} alt={author.name} size="sm" />
                <p className="text-sm font-semibold">{author.name}</p>
            </div>
            <p className="text-sm mt-1 italic">"{post.content.substring(0, 100)}{post.content.length > 100 ? '...' : ''}"</p>
        </div>
    );
}

const StoryReplyPreview: React.FC<{ reply: ChatMessage['storyReply'] }> = ({ reply }) => {
    if(!reply) return null;
    return (
        <div className="mt-1 border-l-4 border-secondary/50 pl-3 py-2 bg-black/5 dark:bg-white/5 rounded-r-lg flex items-center space-x-3">
            <img src={reply.media} alt="Story reply media" className="w-12 h-16 object-cover rounded-md"/>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Replied to</p>
                <p className="text-sm font-semibold">{reply.authorName}'s story</p>
            </div>
        </div>
    );
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage, onViewPost }) => {
  const { posts } = useData();
  const alignment = isOwnMessage ? 'justify-end' : 'justify-start';
  const bubbleColor = isOwnMessage ? 'bg-primary text-white' : 'bg-base-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100';
  const senderName = message.sender.name === 'ANONYMOUS' ? 'Anonymous' : message.sender.name;

  const post = message.sharedPostId ? posts.find(p => p.id === message.sharedPostId) : null;

  return (
    <div className={`flex items-end gap-2 ${alignment}`}>
      {!isOwnMessage && (
        <Link to={`/profile/${message.sender.id}`}>
          <Avatar src={message.sender.avatar} alt={senderName} size="sm" isOnline={message.sender.isOnline}/>
        </Link>
      )}
      <div className="flex flex-col">
          {!isOwnMessage && <p className="text-xs text-gray-500 dark:text-gray-400 ml-3 mb-1">{senderName}</p>}
          <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${bubbleColor} ${isOwnMessage ? 'rounded-br-md' : 'rounded-bl-md'}`}>
            {message.storyReply && <StoryReplyPreview reply={message.storyReply} />}
            <p className="break-words">{message.content}</p>
            {post && onViewPost && <SharedPostPreview post={post} onClick={() => onViewPost(post.id)} />}
          </div>
          <p className={`text-xs text-gray-400 dark:text-gray-500 mt-1 ${isOwnMessage ? 'text-right mr-3' : 'text-left ml-3'}`}>{message.createdAt}</p>
      </div>
       {isOwnMessage && (
        <Link to={`/profile/${message.sender.id}`}>
          <Avatar src={message.sender.avatar} alt={senderName} size="sm" isOnline={message.sender.isOnline}/>
        </Link>
       )}
    </div>
  );
};
