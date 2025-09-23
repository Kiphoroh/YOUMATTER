import React from 'react';
import { StatCard } from '../../components/admin/StatCard';
import { MoodChart } from '../../components/admin/MoodChart';
import { mockUsers, mockPosts, mockReports, mockMoodData } from '../../data/mockData';
import { UsersIcon, PencilAltIcon, ExclamationIcon, ChartBarIcon } from '../../constants';

export const AdminDashboardPage: React.FC = () => {
    return (
        <div className="p-6 bg-base-100 dark:bg-gray-900 min-h-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard 
                    title="Total Users" 
                    value={mockUsers.length.toString()} 
                    icon={<UsersIcon />}
                    change="+5.4%"
                    changeType="increase"
                />
                <StatCard 
                    title="Total Posts" 
                    value={mockPosts.length.toString()} 
                    icon={<PencilAltIcon />}
                    change="+12"
                    changeType="increase"
                />
                <StatCard 
                    title="Open Reports" 
                    value={mockReports.filter(r => r.status === 'pending').length.toString()}
                    icon={<ExclamationIcon />}
                    change="-2"
                    changeType="decrease"
                />
                <StatCard 
                    title="Daily Active Users" 
                    value="1,204" 
                    icon={<ChartBarIcon />}
                    change="+1.2%"
                    changeType="increase"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6">
                <MoodChart data={mockMoodData} />
            </div>
        </div>
    );
};
