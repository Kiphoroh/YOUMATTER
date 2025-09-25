
import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', isOnline }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const onlineIndicatorSize = {
      sm: 'w-2.5 h-2.5 border-2',
      md: 'w-3 h-3 border-2',
      lg: 'w-4 h-4 border-2',
      xl: 'w-5 h-5 border-2',
  }

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
        <img className="w-full h-full rounded-full object-cover" src={src} alt={alt} />
        {isOnline !== undefined && (
            <span
                className={`absolute bottom-0 right-0 block rounded-full border-white dark:border-gray-800 ${onlineIndicatorSize[size]} ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                title={isOnline ? 'Online' : 'Offline'}
            />
        )}
    </div>
  );
};