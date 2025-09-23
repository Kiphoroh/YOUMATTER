import React from 'react';
import { Story } from '../../types';
import { useAuth } from '../../hooks/useAuth';

export const StoryReel: React.FC<{ stories: Story[] }> = ({ stories }) => {
  const { user } = useAuth();
  if(!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Stories</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 -mb-2">
            {/* Add Your Story */}
            <div className="flex-shrink-0 w-24 h-40 rounded-xl bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative overflow-hidden">
                <img src={user.avatar} className="w-full h-full object-cover" alt="Your story" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-2 text-center text-white">
                    <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center border-2 border-white mx-auto mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-xs font-semibold">Add Story</p>
                </div>
            </div>
            {stories.map(story => (
                <div key={story.id} className="flex-shrink-0 w-24 h-40 rounded-xl cursor-pointer relative overflow-hidden group">
                    <img src={story.media} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={`${story.author.name}'s story`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img src={story.author.avatar} className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-primary" alt={story.author.name} />
                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold truncate">{story.author.name}</p>
                </div>
            ))}
        </div>
    </div>
  );
};
