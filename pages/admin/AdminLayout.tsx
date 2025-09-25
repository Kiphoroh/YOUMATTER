
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ADMIN_NAV_LINKS, LogoutIcon, MenuIcon } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../../components/ui/Avatar';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    if(!user) return null;

    return (
        <aside className="w-64 bg-neutral dark:bg-gray-900 text-white flex flex-col h-full">
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

const AdminMobileHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const location = useLocation();
    const { user } = useAuth();
    
    const pageTitle = ADMIN_NAV_LINKS.find(link => location.pathname === link.path)?.name || 'Dashboard';

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
            <button onClick={onMenuClick} className="text-gray-600 dark:text-gray-300">
                <MenuIcon />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
            <Link to="/profile">
                <Avatar src={user?.avatar || ''} alt={user?.name || ''} size="sm" />
            </Link>
        </div>
    );
};


export const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-base-100 dark:bg-gray-900">
             {/* Sidebar for desktop */}
            <div className="hidden md:block flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Sidebar for mobile (overlay) */}
            <div className={`fixed inset-y-0 left-0 z-40 md:hidden transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <AdminSidebar />
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
            
            <main className="flex-1 flex flex-col overflow-y-auto">
                <div className="md:hidden">
                    <AdminMobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
