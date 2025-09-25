
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePost } from '../components/posts/CreatePost';
import { PostCard } from '../components/posts/PostCard';
import { StoryReel } from '../components/posts/StoryReel';
import { MoodCheckin } from '../components/shared/MoodCheckin';
import { CommunityChallenge } from '../components/shared/CommunityChallenge';
import { Story, Post, PostCategory, Conversation, ChatMessage, User } from '../types';
import { AddStoryModal } from '../components/modals/AddStoryModal';
import { StoryViewer } from '../components/modals/StoryViewer';
import { ShareModal } from '../components/modals/ShareModal';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { Modal } from '../components/ui/Modal';
import { ViewersModal } from '../components/modals/ViewersModal';
import { PostAnalyticsModal } from '../components/modals/PostAnalyticsModal';

export const HomePage: React.FC = () => {
  const { user, users } = useAuth();
  const { posts, stories, addPost, likePost, addComment, addStory, viewStory, viewPost } = useData();
  const navigate = useNavigate();

  // Modal States
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [sharingPost, setSharingPost] = useState<Post | null>(null);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [viewingStoryViewers, setViewingStoryViewers] = useState<{ story: Story; viewers: User[] } | null>(null);
  const [analyzingPost, setAnalyzingPost] = useState<Post | null>(null);

  const handleAddStorySubmit = (media: string) => {
    addStory(media);
    setIsAddStoryModalOpen(false);
  };

  const handleReplyToStory = (story: Story, replyContent: string) => {
    if (!user || !replyContent.trim()) return;
    
    const conversationsKey = `youmatter_conversations_${user.id}`;
    const conversationsStr = localStorage.getItem(conversationsKey);
    let conversations: Conversation[] = conversationsStr ? JSON.parse(conversationsStr) : [];
    
    const participantIds = [user.id, story.author.id].sort().join('-');
    let convo = conversations.find(c => c.id === `private-${participantIds}`);

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user,
      content: replyContent,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      storyReply: {
        authorName: story.author.name,
        media: story.media,
      }
    };

    if (convo) {
      convo.messages.push(message);
      convo.lastMessage = message;
    } else {
      const authorUser = users.find(u => u.id === story.author.id);
      if (!authorUser) return;
      convo = {
        id: `private-${participantIds}`,
        type: 'private',
        participants: [user, authorUser],
        messages: [message],
        lastMessage: message,
      };
      conversations.push(convo);
    }

    localStorage.setItem(conversationsKey, JSON.stringify(conversations));
    setViewingStory(null); // Close story viewer
    navigate(`/chat/${convo.id}`); // Navigate to chat
  };

  const handleSharePost = (post: Post, conversationIds: string[]) => {
     if (!user || !post) return;
    
    const conversationsKey = `youmatter_conversations_${user.id}`;
    const conversationsStr = localStorage.getItem(conversationsKey);
    let conversations: Conversation[] = conversationsStr ? JSON.parse(conversationsStr) : [];

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user,
      content: 'Shared a post',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sharedPostId: post.id,
    };

    const updatedConversations = conversations.map(c => {
      if (conversationIds.includes(c.id)) {
        return {
          ...c,
          messages: [...c.messages, message],
          lastMessage: message,
        };
      }
      return c;
    });

    localStorage.setItem(conversationsKey, JSON.stringify(updatedConversations));
    setSharingPost(null); // Close share modal
    alert('Post shared successfully!');
  };

  const handleShowStoryViewers = (story: Story) => {
    const viewers = users.filter(u => story.viewedBy.includes(u.id));
    setViewingStoryViewers({ story, viewers });
  };

  return (
    <div className="container mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <main className="lg:col-span-2">
        <StoryReel
          stories={stories}
          onAddStoryClick={() => setIsAddStoryModalOpen(true)}
          onStoryClick={(story) => {
            setViewingStory(story);
            viewStory(story.id);
          }}
          onViewersClick={handleShowStoryViewers}
        />
        <CreatePost onAddPost={addPost} />
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            onLike={likePost}
            onAddComment={addComment}
            onShare={() => setSharingPost(post)}
            onViewPost={viewPost}
            onShowAnalytics={() => setAnalyzingPost(post)}
          />
        ))}
      </main>

      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="sticky top-20 space-y-6">
            <MoodCheckin />
            <CommunityChallenge onParticipateClick={() => setIsChallengeModalOpen(true)} />
        </div>
      </aside>

      <AddStoryModal
        isOpen={isAddStoryModalOpen}
        onClose={() => setIsAddStoryModalOpen(false)}
        onAddStory={handleAddStorySubmit}
      />

      {viewingStory && (
        <StoryViewer 
            story={viewingStory}
            onClose={() => setViewingStory(null)}
            onReply={handleReplyToStory}
        />
      )}

      {sharingPost && (
        <ShareModal 
          isOpen={!!sharingPost}
          onClose={() => setSharingPost(null)}
          onShare={(conversationIds) => handleSharePost(sharingPost, conversationIds)}
        />
      )}
      
      {viewingStoryViewers && (
        <ViewersModal
          isOpen={!!viewingStoryViewers}
          onClose={() => setViewingStoryViewers(null)}
          users={viewingStoryViewers.viewers}
          title="Viewed By"
        />
      )}

      <PostAnalyticsModal
        isOpen={!!analyzingPost}
        onClose={() => setAnalyzingPost(null)}
        post={analyzingPost}
      />

      <Modal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} title="Weekly Challenge">
        <p className="text-gray-600 dark:text-gray-300 mb-4">Share one positive thought you had this week. Let's spread some good vibes!</p>
        <CreatePost
          onAddPost={(data) => {
            addPost(data);
            setIsChallengeModalOpen(false);
          }}
          initialCategory={PostCategory.Challenge}
          hideCategorySelector={true}
          hideAnonymousToggle={true}
        />
      </Modal>
    </div>
  );
};
