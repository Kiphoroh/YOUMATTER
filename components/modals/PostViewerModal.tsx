
import React from 'react';
import { Post } from '../../types';
import { Modal } from '../ui/Modal';
import { PostCard } from '../posts/PostCard';

interface PostViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
}

export const PostViewerModal: React.FC<PostViewerModalProps> = ({ 
  isOpen, 
  onClose, 
  post,
  onLikePost,
  onAddComment,
}) => {
  if (!post) return null;

  // Sharing/Analytics from this modal is out of scope.
  const mockFunc = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Post by @${post.author.username}`}>
        <div className="-m-6">
            <PostCard 
                post={post}
                onLike={onLikePost}
                onAddComment={onAddComment}
                onShare={mockFunc}
                onViewPost={mockFunc}
                onShowAnalytics={mockFunc}
            />
        </div>
    </Modal>
  );
};
