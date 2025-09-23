
export interface User {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  interests: string[];
  role: 'user' | 'moderator' | 'admin';
  points: number;
  badges: string[];
}

export enum PostCategory {
  MentalHealth = 'Mental Health',
  Education = 'Education',
  Careers = 'Careers',
  Fun = 'Fun',
  Life = 'Life',
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  isAnonymous: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  media?: string;
  category: PostCategory;
  likes: number;
  comments: Comment[];
  shares: number;
  createdAt: string;
  isAnonymous: boolean;
}

export interface Story {
  id: string;
  author: User;
  media: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'Scholarship' | 'Gig' | 'Job' | 'Event';
  description: string;
  postedBy: User;
  link: string;
  deadline?: string;
}

export enum Mood {
  Joyful = '😊',
  Happy = '🙂',
  Neutral = '😐',
  Sad = '😢',
  Angry = '😡',
}

export interface MoodCheck {
  id: string;
  userId: string;
  mood: Mood;
  date: string;
}

export interface Report {
  id: string;
  reportedContentId: string; // post or comment id
  reportedBy: User;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
}
