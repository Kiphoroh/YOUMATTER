import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NAV_LINKS, LogoutIcon } from '../../constants';
import { Avatar } from '../ui/Avatar';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          YOUMATTER
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary font-semibold' : ''}`}
            >
              {React.cloneElement(link.icon, { className: 'w-5 h-5' })}
              <span>{link.name}</span>
            </Link>
          ))}
          {user?.role === 'admin' && (
             <Link
              to="/admin"
              className={`flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors ${location.pathname.startsWith('/admin') ? 'text-primary font-semibold' : ''}`}
            >
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user && (
            <>
              <Link to="/profile" className="flex items-center space-x-2">
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <span className="hidden sm:inline font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
              </Link>
              <button onClick={logout} className="text-gray-500 dark:text-gray-400 hover:text-error" title="Logout">
                <LogoutIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
