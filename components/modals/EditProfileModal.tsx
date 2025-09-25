import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedData: Partial<User>) => Promise<{ success: boolean; message?: string }>;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [interests, setInterests] = useState(user.interests.join(', '));
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // When the modal opens, sync state with the user prop in case it changed
  useEffect(() => {
    if (isOpen) {
        setName(user.name);
        setBio(user.bio);
        setInterests(user.interests.join(', '));
        setAvatarPreview(null);
        setError('');
    }
  }, [isOpen, user]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('File is too large. Max 2MB.');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const interestsArray = interests.split(',').map(i => i.trim()).filter(Boolean);
    
    const updatedData: Partial<User> = {
      name,
      bio,
      interests: interestsArray,
    };

    if (avatarPreview) {
      updatedData.avatar = avatarPreview;
    }

    const result = await onSave(updatedData);
    if (result.success) {
      onClose();
    }
    // In case of an error, keep the modal open to show an error message (if implemented)
    setIsSaving(false);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
            <label htmlFor="avatar-upload" className="cursor-pointer group relative">
                <Avatar src={avatarPreview || user.avatar} alt="Profile preview" size="lg" />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-semibold">Change</span>
                </div>
            </label>
            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {error && <p className="text-sm text-error">{error}</p>}
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="edit-name">Name</label>
            <input 
              id="edit-name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-gray-100" 
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="edit-bio">Bio</label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-gray-100"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="edit-interests">Interests</label>
            <input 
              id="edit-interests"
              type="text" 
              value={interests} 
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. tech, music, hiking"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-gray-100" 
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate interests with a comma.</p>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
      </div>
    </Modal>
  );
};