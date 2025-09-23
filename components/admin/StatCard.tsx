import React from 'react';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

  return (
    <Card>
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
      </div>
      {change && (
        <div className="text-sm font-medium mt-4">
          <span className={changeColor}>{change}</span>
          <span className="text-gray-500 dark:text-gray-400"> vs last week</span>
        </div>
      )}
    </Card>
  );
};
