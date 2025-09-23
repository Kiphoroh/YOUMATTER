
import React from 'react';
import { mockPosts, mockStories } from '../data/mockData';
import { CreatePost } from '../components/posts/CreatePost';
import { PostCard } from '../components/posts/PostCard';
import { StoryReel } from '../components/posts/StoryReel';
import { MoodCheckin } from '../components/shared/MoodCheckin';
import { CommunityChallenge } from '../components/shared/CommunityChallenge';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <main className="lg:col-span-2">
        <StoryReel stories={mockStories} />
        <CreatePost />
        {mockPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>

      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="sticky top-20 space-y-6">
            <MoodCheckin />
            <CommunityChallenge />
        </div>
      </aside>
    </div>
  );
};
