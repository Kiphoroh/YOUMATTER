
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ChatPage } from './pages/ChatPage';

// Admin Imports
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';

const AppContent: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const isChatPage = location.pathname.startsWith('/chat');

    if (!isAuthenticated) {
        return <LoginPage />;
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-base-100 dark:bg-gray-900">
            {!isChatPage && <Header />}
            {isChatPage && <div className="md:hidden"><Header /></div>}
            <main className={`flex-1 ${isChatPage ? '' : 'pb-16 md:pb-0'}`}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/chat/:conversationId" element={<ChatPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                    <Route path="/opportunities" element={<OpportunitiesPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    
                    {/* Admin Routes */}
                    <Route 
                        path="/admin/*" 
                        element={
                            user?.role === 'admin' ? (
                                <Routes>
                                    <Route element={<AdminLayout />}>
                                        <Route index element={<AdminDashboardPage />} />
                                        <Route path="users" element={<AdminUsersPage />} />
                                        {/* Placeholder routes for other admin pages */}
                                        <Route path="posts" element={<div className="p-6 text-gray-900 dark:text-gray-100">Manage Posts</div>} />
                                        <Route path="reports" element={<div className="p-6 text-gray-900 dark:text-gray-100">Manage Reports</div>} />
                                    </Route>
                                </Routes>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            {!isChatPage && <Footer />}
            {!isChatPage && <MobileNav />}
        </div>
    );
};

const App = () => {
  return (
    // Fix: Providers moved to index.tsx to resolve typing issue and for better separation.
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;