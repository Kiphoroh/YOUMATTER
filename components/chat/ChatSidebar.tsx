
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Conversation, User } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Header } from '../layout/Header';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentUser: User;
  allUsers: User[];
  onStartConversation: (user: User) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ conversations, currentUser, allUsers, onStartConversation }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'users'>('chats');

  const getParticipant = (convo: Conversation) => {
    return convo.participants.find(p => p.id !== currentUser.id);
  };
  
  const otherUsers = allUsers.filter(u => u.id !== currentUser.id);

  return (
    <aside className="w-full h-full bg-base-100 dark:bg-gray-900 md:w-80 lg:w-96 flex flex-col border-r border-base-300 dark:border-gray-700">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="p-4 border-b border-base-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chats</h2>
      </div>

      <div className="border-b border-base-300 dark:border-gray-700">
        <div className="flex">
            <button onClick={() => setActiveTab('chats')} className={`flex-1 p-3 text-sm font-semibold ${activeTab === 'chats' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>
                My Chats
            </button>
            <button onClick={() => setActiveTab('users')} className={`flex-1 p-3 text-sm font-semibold ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>
                New Chat
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && conversations.map(convo => {
          const participant = getParticipant(convo);
          const name = convo.type === 'group' ? convo.name : participant?.name;
          const avatar = convo.type === 'group' ? 'https://i.pravatar.cc/150?u=community' : participant?.avatar;

          return (
            <NavLink
              key={convo.id}
              to={`/chat/${convo.id}`}
              className={({ isActive }) => 
                `flex items-center p-3 space-x-3 hover:bg-base-200 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-base-300 dark:border-gray-800 ${
                  isActive ? 'bg-primary/10 dark:bg-primary/20' : ''
                }`
              }
            >
              <Avatar src={avatar || ''} alt={name || 'Chat'} size="md" isOnline={participant?.isOnline} />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{name}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{convo.lastMessage?.createdAt}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{convo.lastMessage?.content}</p>
              </div>
            </NavLink>
          );
        })}
        {activeTab === 'users' && otherUsers.map(user => (
            <div
              key={user.id}
              onClick={() => onStartConversation(user)}
              className="flex items-center p-3 space-x-3 hover:bg-base-200 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-base-300 dark:border-gray-800"
            >
              <Avatar src={user.avatar} alt={user.name} size="md" isOnline={user.isOnline} />
              <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">@{user.username}</p>
              </div>
            </div>
        ))}
      </div>
    </aside>
  );
};