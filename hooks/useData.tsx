
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Post, Story, Opportunity, Report, PostCategory, Comment, User, Resource } from '../types';
import { useAuth } from './useAuth';
import { mockPosts, mockStories, mockOpportunities, mockReports, mockResources, mockMoodData } from '../data/mockData';

interface AppData {
  posts: Post[];
  stories: Story[];
  opportunities: Opportunity[];
  reports: Report[];
  resources: Resource[];
  moodData: any[];
}

interface DataContextType extends AppData {
  addPost: (data: { content: string; isAnonymous: boolean; category: PostCategory, media?: string }) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  addStory: (media: string) => void;
  viewStory: (storyId: string) => void;
  viewPost: (postId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DATA_STORAGE_KEY = 'youmatter_app_data';

const seedData = (): AppData => {
    return {
        posts: mockPosts,
        stories: mockStories,
        opportunities: mockOpportunities,
        reports: mockReports,
        resources: mockResources,
        moodData: mockMoodData,
    };
};

// Fix: Use React.PropsWithChildren to correctly type the component with children, resolving the TypeScript error.
export const DataProvider = ({ children }: React.PropsWithChildren) => {
    const { user } = useAuth(); 

    const [data, setData] = useState<AppData>(() => {
        try {
            const storedData = window.localStorage.getItem(DATA_STORAGE_KEY);
            if (storedData) {
                return JSON.parse(storedData);
            }
            const initial = seedData();
            window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(initial));
            return initial;
        } catch (error) {
            console.error("Failed to load or seed data from localStorage", error);
            return seedData();
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [data]);

    const addPost = (postData: { content: string; isAnonymous: boolean; category: PostCategory, media?: string }) => {
        if (!user) return;
        const newPost: Post = {
          id: `p${Date.now()}`,
          author: user,
          content: postData.content,
          category: postData.category,
          isAnonymous: postData.isAnonymous,
          media: postData.media,
          likes: 0,
          likedBy: [],
          shares: 0,
          comments: [],
          createdAt: 'Just now',
          viewedBy: [],
        };
        setData(prev => ({ ...prev, posts: [newPost, ...prev.posts] }));
    };
    
    const likePost = (postId: string) => {
        if (!user) return;
        setData(prev => ({
            ...prev,
            posts: prev.posts.map(post => {
                if (post.id === postId) {
                    const isLiked = post.likedBy.includes(user.id);
                    const likedBy = isLiked ? post.likedBy.filter(id => id !== user.id) : [...post.likedBy, user.id];
                    return { ...post, likedBy, likes: likedBy.length };
                }
                return post;
            })
        }));
    };
    
    const addComment = (postId: string, content: string) => {
        if (!user) return;
        const newComment: Comment = {
          id: `c${Date.now()}`,
          author: user,
          content,
          createdAt: 'Just now',
          isAnonymous: false,
        };
        setData(prev => ({
            ...prev,
            posts: prev.posts.map(post => {
                if (post.id === postId) {
                  return { ...post, comments: [...post.comments, newComment] };
                }
                return post;
            })
        }));
    };
    
    const addStory = (media: string) => {
        if (!user) return;
        const newStory: Story = {
          id: `s${Date.now()}`,
          author: user,
          media,
          createdAt: 'Just now',
          viewedBy: [],
        };
        setData(prev => ({ ...prev, stories: [newStory, ...prev.stories] }));
    };

    const viewStory = (storyId: string) => {
        if (!user) return;
        setData(prev => ({
            ...prev,
            stories: prev.stories.map(story => {
                if (story.id === storyId && story.author.id !== user.id && !story.viewedBy.includes(user.id)) {
                  return { ...story, viewedBy: [...story.viewedBy, user.id] };
                }
                return story;
            })
        }));
    };

    const viewPost = (postId: string) => {
        if (!user) return;
        setData(prev => ({
            ...prev,
            posts: prev.posts.map(post => {
              if (post.id === postId && !post.viewedBy.includes(user.id)) {
                return { ...post, viewedBy: [...post.viewedBy, user.id] };
              }
              return post;
            })
        }));
    };

    return (
        <DataContext.Provider value={{ ...data, addPost, likePost, addComment, addStory, viewStory, viewPost }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
