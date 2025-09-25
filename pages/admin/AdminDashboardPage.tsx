
import React from 'react';
import { StatCard } from '../../components/admin/StatCard';
import { MoodChart } from '../../components/admin/MoodChart';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { UsersIcon, PencilAltIcon, ExclamationIcon, ChartBarIcon } from '../../constants';

export const AdminDashboardPage: React.FC = () => {
    const { users } = useAuth();
    const { posts, reports, moodData } = useData();

    return (
        <div className="p-6 bg-base-100 dark:bg-gray-900 min-h-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard 
                    title="Total Users" 
                    value={users.length.toString()} 
                    icon={<UsersIcon />}
                />
                <StatCard 
                    title="Total Posts" 
                    value={posts.length.toString()} 
                    icon={<PencilAltIcon />}
                />
                <StatCard 
                    title="Open Reports" 
                    value={reports.filter(r => r.status === 'pending').length.toString()}
                    icon={<ExclamationIcon />}
                />
                <StatCard 
                    title="Daily Active Users" 
                    value={users.filter(u => u.isOnline).length.toString()}
                    icon={<ChartBarIcon />}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6">
                <MoodChart data={moodData} />
            </div>
        </div>
    );
};
