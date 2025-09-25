
import { Conversation } from '../types';
import { mockUsers } from './mockData';

const [u1, u2, u3, u4] = mockUsers;

export const mockConversations: Conversation[] = [
  {
    id: 'community',
    type: 'group',
    name: 'Community Chat',
    participants: [u1, u2, u3, u4],
    messages: [
      { id: 'm1', sender: u2, content: 'Hey everyone! How\'s it going?', createdAt: '10:00 AM' },
      { id: 'm2', sender: u3, content: 'Doing great! Just working on a cool project.', createdAt: '10:01 AM' },
      { id: 'm3', sender: u1, content: 'Hello! Welcome to the community chat. Feel free to share anything on your mind.', createdAt: '10:02 AM' },
      { id: 'm4', sender: u4, content: 'Just wanted to share a win - I passed my exam! 🎉', createdAt: '10:05 AM' },
    ],
  },
  {
    id: 'u1-u2',
    type: 'private',
    participants: [u1, u2],
    messages: [
      { id: 'pm1', sender: u1, content: 'Hey Jamie, I saw your painting. It\'s fantastic!', createdAt: 'Yesterday' },
      { id: 'pm2', sender: u2, content: 'Thanks so much Alex! That means a lot.', createdAt: 'Yesterday' },
    ],
  },
  {
    id: 'u1-u3',
    type: 'private',
    participants: [u1, u3],
    messages: [
       { id: 'pm3', sender: u3, content: 'Quick question about the moderator guidelines.', createdAt: '2 days ago' },
       { id: 'pm4', sender: u1, content: 'Sure, what\'s up?', createdAt: '2 days ago' },
    ],
  }
];
