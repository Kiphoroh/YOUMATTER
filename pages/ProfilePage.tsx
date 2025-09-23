import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-6 animate-fade-in">
        <Card className="!p-0">
            <div className="h-48 bg-gradient-to-r from-primary to-secondary rounded-t-xl"></div>
            <div className="p-6">
                <div className="flex items-end -mt-16">
                    <Avatar src={user.avatar} alt={user.name} size="xl" />
                    <div className="ml-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">@{user.name.toLowerCase().replace(' ', '')}</p>
                    </div>
                    <Button variant="ghost" className="ml-auto">Edit Profile</Button>
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                    {user.interests.map(interest => (
                        <span key={interest} className="bg-purple-100 text-primary text-sm font-medium px-3 py-1 rounded-full dark:bg-primary/20 dark:text-purple-300">
                           #{interest}
                        </span>
                    ))}
                </div>
            </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Stats</h3>
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold text-primary">{user.points}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-primary">{user.badges.length}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Badges</p>
                    </div>
                </div>
            </Card>
             <Card>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Badges</h3>
                <div className="flex flex-wrap gap-4 items-center">
                    {user.badges.map(badge => (
                        <div key={badge} className="text-center">
                             <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-3xl">🏆</div>
                             <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{badge}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
  );
};
