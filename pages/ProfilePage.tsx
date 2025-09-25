import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { EditProfileModal } from '../components/modals/EditProfileModal';

export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser, updateUser, users } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      const foundUser = users.find(u => u.id === userId);
      setProfileUser(foundUser || null);
    } else {
      setProfileUser(currentUser);
    }
  }, [userId, currentUser, users]);
  
  const isOwnProfile = profileUser?.id === currentUser?.id;

  if (profileUser === undefined) {
    return <div className="text-center p-10">Loading...</div>; // Loading state
  }
  
  if (profileUser === null) {
      return (
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">User not found.</h2>
        </div>
      );
  }

  return (
    <>
      <div className="container mx-auto px-4 pt-6 animate-fade-in">
          <Card className="!p-0">
              <div className="h-48 bg-gradient-to-r from-primary to-secondary rounded-t-xl"></div>
              <div className="p-6">
                  <div className="flex items-end -mt-16">
                      <Avatar src={profileUser.avatar} alt={profileUser.name} size="xl" isOnline={profileUser.isOnline} />
                      <div className="ml-4">
                          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{profileUser.name}</h1>
                          <p className="text-gray-500 dark:text-gray-400">@{profileUser.username}</p>
                      </div>
                      {isOwnProfile && <Button variant="ghost" className="ml-auto" onClick={() => setIsEditModalOpen(true)}>Edit Profile</Button>}
                  </div>

                  <p className="mt-4 text-gray-700 dark:text-gray-300">{profileUser.bio}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                      {profileUser.interests.map(interest => (
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
                          <p className="text-2xl font-bold text-primary">{profileUser.points}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
                      </div>
                      <div>
                          <p className="text-2xl font-bold text-primary">{profileUser.badges.length}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Badges</p>
                      </div>
                  </div>
              </Card>
              <Card>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Badges</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                      {profileUser.badges.map(badge => (
                          <div key={badge} className="text-center">
                              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-3xl">🏆</div>
                              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{badge}</p>
                          </div>
                      ))}
                  </div>
              </Card>
          </div>
      </div>
      {isOwnProfile && currentUser && (
        <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={currentUser}
            onSave={updateUser}
        />
      )}
    </>
  );
};