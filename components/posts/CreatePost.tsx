
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PostCategory } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

interface CreatePostProps {
  onAddPost: (data: { content: string; isAnonymous: boolean; category: PostCategory, media?: string }) => void;
  initialCategory?: PostCategory;
  hideCategorySelector?: boolean;
  hideAnonymousToggle?: boolean;
}

export const CreatePost: React.FC<CreatePostProps> = ({ 
  onAddPost,
  initialCategory = PostCategory.MentalHealth,
  hideCategorySelector = false,
  hideAnonymousToggle = false
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<PostCategory>(initialCategory);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  if (!user) return null;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaPreview) return;
    
    onAddPost({
      content,
      isAnonymous,
      category,
      media: mediaPreview || undefined,
    });
    
    setContent('');
    setIsAnonymous(false);
    setCategory(initialCategory);
    setMediaPreview(null);
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
      {mediaPreview && (
        <div className="mt-4 relative">
          <img src={mediaPreview} alt="Selected media" className="rounded-lg w-full object-cover max-h-60" />
          <button onClick={() => setMediaPreview(null)} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          {!hideAnonymousToggle && (
            <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-primary focus:ring-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              <span>Post Anonymously</span>
            </label>
          )}
          {!hideCategorySelector && (
            <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                className="text-sm border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-primary focus:border-primary"
              >
                  {Object.values(PostCategory).map(cat => <option key={cat}>{cat}</option>)}
            </select>
          )}
          <label htmlFor="media-upload" className="cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </label>
          <input id="media-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
        <Button onClick={handleSubmit} size="md" disabled={!content.trim() && !mediaPreview}>
          Post
        </Button>
      </div>
    </div>
  );
};