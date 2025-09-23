import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

export const MobileNav: React.FC = () => {
    const location = useLocation();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-base-300 dark:border-gray-700 shadow-lg z-50">
            <div className="flex justify-around items-center h-16">
                {NAV_LINKS.map(link => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`flex flex-col items-center justify-center space-y-1 text-xs w-full ${location.pathname === link.path ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
