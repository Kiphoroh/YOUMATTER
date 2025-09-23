import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-xl transition-shadow duration-300' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 ${clickableStyles} ${className}`}
    >
      {children}
    </div>
  );
};
