import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Conversation, User } from '../../types';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (conversationIds: string[]) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onShare }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvoIds, setSelectedConvoIds] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && user) {
      const conversationsKey = `youmatter_conversations_${user.id}`;
      const savedConversations = localStorage.getItem(conversationsKey);
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      } else {
        setConversations([]);
      }
    } else {
        setSelectedConvoIds([]); // Reset on close
    }
  }, [isOpen, user]);

  const handleToggleSelection = (convoId: string) => {
    setSelectedConvoIds(prev =>
      prev.includes(convoId) ? prev.filter(id => id !== convoId) : [...prev, convoId]
    );
  };
  
  const getParticipant = (convo: Conversation, currentUser: User) => {
    return convo.participants.find(p => p.id !== currentUser.id);
  };

  const handleShare = () => {
    if (selectedConvoIds.length > 0) {
      onShare(selectedConvoIds);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Post">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Select one or more chats to share this post with.</p>
        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {user && conversations.map(convo => {
                const participant = getParticipant(convo, user);
                const name = convo.type === 'group' ? convo.name : participant?.name;
                const avatar = convo.type === 'group' ? 'https://i.pravatar.cc/150?u=community' : participant?.avatar;
                const isSelected = selectedConvoIds.includes(convo.id);
                
                return (
                    <div 
                        key={convo.id} 
                        onClick={() => handleToggleSelection(convo.id)}
                        className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-primary/20' : 'hover:bg-base-200 dark:hover:bg-gray-700'}`}
                    >
                        <Avatar src={avatar || ''} alt={name || ''} size="sm" />
                        <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{name}</span>
                        <div className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                           {isSelected && <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="flex justify-end pt-4">
            <Button onClick={handleShare} disabled={selectedConvoIds.length === 0}>
                Share
            </Button>
        </div>
      </div>
    </Modal>
  );
};