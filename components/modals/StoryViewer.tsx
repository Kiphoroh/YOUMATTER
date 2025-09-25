
import React, { useEffect, useState } from 'react';
import { Story } from '../../types';
import { Avatar } from '../ui/Avatar';

interface StoryViewerProps {
    story: Story;
    onClose: () => void;
    onReply: (story: Story, message: string) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose, onReply }) => {
    const [progress, setProgress] = useState(0);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        const STORY_DURATION = 5000; // 5 seconds
        const timer = setTimeout(onClose, STORY_DURATION);
        
        const interval = setInterval(() => {
            setProgress(p => p + 100 / (STORY_DURATION / 10)); 
        }, 10);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [story, onClose]);

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReply(story, replyContent);
        setReplyContent('');
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-fade-in" onClick={onClose} role="dialog" aria-label="Story viewer">
            <div className="relative w-full max-w-sm h-[90vh] rounded-lg overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-2 left-2 right-2 h-1 bg-white/30 rounded-full overflow-hidden z-10">
                    <div className="h-full bg-white" style={{ width: `${progress}%`, transition: 'width 10ms linear' }}></div>
                </div>

                <div className="relative flex-1">
                    <img src={story.media} alt={`${story.author.name}'s story`} className="w-full h-full object-cover" />

                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                        <div className="flex items-center space-x-2">
                            <Avatar src={story.author.avatar} alt={story.author.name} size="md" />
                            <div>
                                <p className="font-bold text-white shadow-sm">{story.author.name}</p>
                                <p className="text-xs text-gray-300 shadow-sm">{story.createdAt}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleReplySubmit} className="p-2 bg-black/50 flex items-center space-x-2">
                    <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Send a message..."
                        className="flex-1 bg-gray-700/50 border border-gray-500 rounded-full py-2 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="text-white p-2 disabled:opacity-50" disabled={!replyContent.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                </form>

                <button onClick={onClose} className="absolute top-4 right-4 text-white p-1 bg-black/30 rounded-full hover:bg-black/50 transition-colors z-10" aria-label="Close story">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
};