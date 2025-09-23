import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ADMIN_NAV_LINKS, LogoutIcon } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../../components/ui/Avatar';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    if(!user) return null;

    return (
        <aside className="w-64 bg-neutral dark:bg-gray-900 text-white flex flex-col">
            <div className="p-6 border-b border-gray-700 dark:border-gray-800">
                 <Link to="/" className="text-2xl font-bold text-white">
                    YOUMATTER
                </Link>
                <p className="text-sm text-gray-400">Admin Panel</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {ADMIN_NAV_LINKS.map(link => (
                     <Link
                        key={link.name}
                        to={link.path}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </Link>
                ))}
            </nav>
             <div className="p-4 border-t border-gray-700 dark:border-gray-800">
                 <div className="flex items-center space-x-3">
                    <Avatar src={user.avatar} alt={user.name} size="md" />
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                    <button onClick={logout} className="ml-auto text-gray-400 hover:text-white" title="Logout">
                       <LogoutIcon />
                    </button>
                 </div>
            </div>
        </aside>
    );
};


export const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-base-200 dark:bg-gray-900">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
