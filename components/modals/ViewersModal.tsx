
import React from 'react';
import { User } from '../../types';
import { Modal } from '../ui/Modal';
import { Avatar } from '../ui/Avatar';

interface ViewersModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  title: string;
}

export const ViewersModal: React.FC<ViewersModalProps> = ({ isOpen, onClose, users, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="max-h-80 overflow-y-auto pr-2 space-y-3">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="flex items-center space-x-3 p-1">
              <Avatar src={user.avatar} alt={user.name} size="md" />
              <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">No one has seen this yet.</p>
        )}
      </div>
    </Modal>
  );
};
