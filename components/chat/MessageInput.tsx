
import React, { useState } from 'react';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onSendMessage(content.trim());
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border-t border-base-300 dark:border-gray-700 flex items-center space-x-3 bg-white dark:bg-gray-800">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                rows={1}
                className="flex-1 bg-base-200 dark:bg-gray-700 rounded-full py-2 px-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100"
                placeholder="Type a message..."
            />
            <button type="submit" className="bg-primary text-white rounded-full p-2 hover:bg-primary-focus transition-colors flex-shrink-0 disabled:bg-primary/50" disabled={!content.trim()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </form>
    );
};
