
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Conversation, User } from '../../types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Avatar } from '../ui/Avatar';
import { Header } from '../layout/Header';
import { TypingIndicator } from './TypingIndicator';

interface ChatWindowProps {
  conversation: Conversation;
  currentUser: User;
  onSendMessage: (content: string) => void;
  onViewPost: (postId: string) => void;
  isAiTyping?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, onSendMessage, onViewPost, isAiTyping = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation.messages, isAiTyping]);

  const participant = conversation.participants.find(p => p.id !== currentUser.id);
  const isPrivateChat = conversation.type === 'private' && participant;
  
  const headerInfo = {
      name: conversation.type === 'group' ? conversation.name : participant?.name,
      avatar: conversation.type === 'group' ? 'https://i.pravatar.cc/150?u=community' : participant?.avatar,
      description: conversation.type === 'group' ? `${conversation.participants.length} members` : (participant?.isOnline ? 'Online' : 'Offline')
  };

  return (
    <div className="flex flex-col h-full">
      <div className="hidden md:block">
        <Header />
      </div>
      {/* Header */}
      <div className="flex items-center p-3 border-b border-base-300 dark:border-gray-700 flex-shrink-0">
        <Link to="/chat" className="md:hidden mr-2 p-2 rounded-full hover:bg-base-200 dark:hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <Link to={isPrivateChat ? `/profile/${participant.id}` : '#'}>
            <Avatar src={headerInfo.avatar || ''} alt={headerInfo.name || ''} size="md" isOnline={participant?.isOnline} />
        </Link>
        <div className="ml-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {isPrivateChat ? (
                 <Link to={`/profile/${participant.id}`} className="hover:underline">{headerInfo.name}</Link>
            ) : (
                headerInfo.name
            )}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{headerInfo.description}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100 dark:bg-gray-900/50">
        {conversation.messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.sender.id === currentUser.id}
            onViewPost={onViewPost}
          />
        ))}
        {isAiTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};