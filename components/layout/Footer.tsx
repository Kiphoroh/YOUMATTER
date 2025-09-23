import React from 'react';
import { SOCIAL_LINKS } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-base-200 dark:bg-gray-800 text-neutral dark:text-gray-300 p-10 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">YOUMATTER</h2>
          <p>Your safe space to connect and grow.</p>
        </div>
        <div className="mt-6 md:mt-0">
          <span className="footer-title font-semibold">Social</span>
          <div className="flex space-x-4 mt-2">
            {SOCIAL_LINKS.map(link => (
              <a key={link.name} href={link.url} className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
       <div className="mt-8 pt-8 border-t border-base-300 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} YOUMATTER. All rights reserved.</p>
      </div>
    </footer>
  );
};
