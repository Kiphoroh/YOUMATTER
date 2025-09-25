
import React from 'react';

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex items-end gap-2 justify-start">
             <div className="flex items-center space-x-1.5 bg-base-200 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
};
