
import React from 'react';
import { Story } from '../../types';
import { useAuth } from '../../hooks/useAuth';

export const StoryReel: React.FC<{ 
    stories: Story[];
    onAddStoryClick: () => void;
    onStoryClick: (story: Story) => void;
    onViewersClick: (story: Story) => void;
}> = ({ stories, onAddStoryClick, onStoryClick, onViewersClick }) => {
  const { user } = useAuth();
  if(!user) return null;

  const handleViewersClick = (e: React.MouseEvent, story: Story) => {
    e.stopPropagation(); // Prevents opening the story viewer
    onViewersClick(story);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Stories</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2 -mb-2">
            {/* Add Your Story */}
            <div onClick={onAddStoryClick} className="flex-shrink-0 w-24 h-40 rounded-xl bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative overflow-hidden">
                <img src={user.avatar} className="w-full h-full object-cover" alt="Your story" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-2 text-center text-white">
                    <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center border-2 border-white mx-auto mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-xs font-semibold">Add Story</p>
                </div>
            </div>
            {stories.map(story => {
                const isOwnStory = story.author.id === user.id;
                return (
                    <div key={story.id} onClick={() => onStoryClick(story)} className="flex-shrink-0 w-24 h-40 rounded-xl cursor-pointer relative overflow-hidden group">
                        <img src={story.media} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={`${story.author.name}'s story`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <img src={story.author.avatar} className="absolute top-2 left-2 w-8 h-8 rounded-full border-2 border-primary" alt={story.author.name} />
                        <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold truncate">{story.author.name}</p>
                        {isOwnStory && (
                            <button onClick={(e) => handleViewersClick(e, story)} className="absolute bottom-8 left-2 flex items-center space-x-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-full hover:bg-black/75 transition-colors">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                <span>{story.viewedBy.length}</span>
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
  );
};