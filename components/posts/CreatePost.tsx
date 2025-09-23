import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PostCategory } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const CreatePost: React.FC = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    // In a real app, this would submit to an API
    console.log({
      content,
      isAnonymous,
      category: 'Mental Health', // Example category
      author: user.id
    });
    setContent('');
    setIsAnonymous(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6">
      <div className="flex items-start space-x-4">
        <Avatar src={user.avatar} alt={user.name} />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-primary focus:border-primary p-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            rows={3}
            placeholder={`What's on your mind, ${user.name}?`}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
            <span>Post Anonymously</span>
          </label>
           <select className="text-sm border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-primary focus:border-primary">
                {Object.values(PostCategory).map(cat => <option key={cat}>{cat}</option>)}
           </select>
        </div>
        <Button onClick={handleSubmit} size="md">
          Post
        </Button>
      </div>
    </div>
  );
};
