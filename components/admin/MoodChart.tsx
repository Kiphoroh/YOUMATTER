import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Mood } from '../../types';
import { Card } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

const moodColors = {
    [Mood.Joyful]: '#34D399',
    [Mood.Happy]: '#A7F3D0',
    [Mood.Neutral]: '#9CA3AF',
    [Mood.Sad]: '#60A5FA',
    [Mood.Angry]: '#F87171',
}

interface MoodChartProps {
    data: any[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
    const { theme } = useTheme();
    const axisColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const tooltipBackgroundColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';

    return (
        <Card>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Community Mood Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                    <XAxis dataKey="date" tick={{ fill: axisColor }} />
                    <YAxis tick={{ fill: axisColor }}/>
                    <Tooltip 
                        cursor={{ fill: theme === 'dark' ? 'rgba(107, 114, 128, 0.1)' : 'rgba(209, 213, 219, 0.3)' }}
                        contentStyle={{ 
                            backgroundColor: tooltipBackgroundColor, 
                            borderColor: theme === 'dark' ? '#374151' : '#E5E7EB' 
                        }} 
                    />
                    <Legend wrapperStyle={{ color: axisColor }} />
                    {Object.values(Mood).map((mood) => (
                        <Bar key={mood} dataKey={mood} stackId="a" fill={moodColors[mood]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
