
import React from 'react';
import { Post } from '../../types';
import { Modal } from '../ui/Modal';

interface PostAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const PostAnalyticsModal: React.FC<PostAnalyticsModalProps> = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post Analytics">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">Here's how your post is performing.</p>
        <div className="grid grid-cols-3 gap-4 text-center pt-4">
          <div>
            <p className="text-3xl font-bold text-primary">{post.viewedBy?.length || 0}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{post.likedBy.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{post.comments.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
