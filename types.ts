
export interface User {
  id: string;
  name: string;
  username: string;
  password?: string; // Made optional for security reasons, won't be sent to client often
  age: number;
  phoneNumber: string;
  bio: string;
  avatar: string;
  interests: string[];
  role: 'user' | 'moderator' | 'admin';
  points: number;
  badges: string[];
  isOnline?: boolean;
}

export enum PostCategory {
  MentalHealth = 'Mental Health',
  Education = 'Education',
  Careers = 'Careers',
  Fun = 'Fun',
  Life = 'Life',
  Challenge = 'Challenge',
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
  likedBy: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  shares: number;
  createdAt: string;
  isAnonymous: boolean;
  viewedBy: string[]; // Array of user IDs who viewed the post
}

export interface Story {
  id: string;
  author: User;
  media: string;
  createdAt: string;
  viewedBy: string[]; // Array of user IDs who viewed the story
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

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  createdAt: string;
  sharedPostId?: string;
  storyReply?: {
    authorName: string;
    media: string;
  };
}

export interface Conversation {
  id: string;
  type: 'private' | 'group';
  participants: User[];
  messages: ChatMessage[];
  name?: string; // For group chats
  lastMessage?: ChatMessage;
}

export interface Resource {
    title: string;
    description: string;
    category: string;
}
