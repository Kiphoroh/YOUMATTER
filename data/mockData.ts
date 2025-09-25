
import { User, Post, Story, Opportunity, Report, PostCategory, Mood } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alex Doe', username: 'alex', password: 'password123', age: 22, phoneNumber: '111-222-3333', bio: 'Spreading positivity & tech enthusiast.', avatar: 'https://i.pravatar.cc/150?u=u1', interests: ['tech', 'music', 'hiking'], role: 'admin', points: 1250, badges: ['Pioneer', 'Top Contributor'], isOnline: true },
  { id: 'u2', name: 'Jamie Smith', username: 'jamie', password: 'password123', age: 19, phoneNumber: '222-333-4444', bio: 'Student and artist. Here to connect.', avatar: 'https://i.pravatar.cc/150?u=u2', interests: ['art', 'books', 'gaming'], role: 'user', points: 800, badges: ['Welcome'], isOnline: false },
  { id: 'u3', name: 'Sam River', username: 'sam', password: 'password123', age: 24, phoneNumber: '333-444-5555', bio: 'Loves coding and coffee.', avatar: 'https://i.pravatar.cc/150?u=u3', interests: ['coding', 'coffee'], role: 'moderator', points: 2100, badges: ['Moderator', 'Community Helper'], isOnline: true },
  { id: 'u4', name: 'Casey Jordan', username: 'casey', password: 'password123', age: 18, phoneNumber: '444-555-6666', bio: 'Just trying to figure things out.', avatar: 'https://i.pravatar.cc/150?u=u4', interests: ['movies', 'sports'], role: 'user', points: 350, badges: ['Welcome'], isOnline: false },
  { id: 'u5', name: 'ANONYMOUS', username: 'anonymous', age: 0, phoneNumber: '', bio: '', avatar: 'https://i.pravatar.cc/150?u=anonymous', interests: [], role: 'user', points: 0, badges: [] },
  { id: 'aura', name: 'AURA', username: 'aura', age: 1, phoneNumber: '000-000-0000', bio: 'Your empathetic AI companion, here to listen and explore thoughts with you.', avatar: 'https://i.pravatar.cc/150?u=aura', interests: ['listening', 'positivity', 'learning'], role: 'user', points: Infinity, badges: ['Companion'], isOnline: true },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: mockUsers[1],
    content: 'Just finished a painting I\'m really proud of. It\'s been a great way to deal with stress. What are your creative outlets?',
    media: 'https://picsum.photos/seed/p1/600/400',
    category: PostCategory.MentalHealth,
    likes: 128,
    likedBy: ['u1', 'u3'],
    shares: 12,
    createdAt: '2 hours ago',
    isAnonymous: false,
    viewedBy: ['u1', 'u3', 'u4'],
    comments: [
      { id: 'c1', author: mockUsers[0], content: 'This is amazing, Jamie! So talented.', createdAt: '1 hour ago', isAnonymous: false },
      { id: 'c2', author: mockUsers[2], content: 'Wow, I love the colors!', createdAt: '30 mins ago', isAnonymous: false },
    ],
  },
  {
    id: 'p2',
    author: mockUsers[4],
    content: 'Feeling really overwhelmed with exams lately. It feels like I\'m the only one struggling to keep up. Any advice on managing study-related anxiety?',
    category: PostCategory.Education,
    likes: 95,
    likedBy: [],
    shares: 5,
    createdAt: '5 hours ago',
    isAnonymous: true,
    viewedBy: ['u1', 'u2', 'u3'],
    comments: [
        { id: 'c3', author: mockUsers[2], content: 'You are definitely not alone. Taking short breaks helps me a lot!', createdAt: '4 hours ago', isAnonymous: false },
        { id: 'c4', author: mockUsers[3], content: 'I feel this. The Pomodoro technique has been a lifesaver for me.', createdAt: '3 hours ago', isAnonymous: false },
    ],
  },
  {
    id: 'p3',
    author: mockUsers[0],
    content: 'Excited to share a great article on building a resume for tech jobs! Hope this helps someone out.',
    category: PostCategory.Careers,
    likes: 72,
    likedBy: ['u4'],
    shares: 25,
    createdAt: '1 day ago',
    isAnonymous: false,
    viewedBy: ['u2', 'u3', 'u4'],
    comments: [],
  }
];

export const mockStories: Story[] = [
  { id: 's1', author: mockUsers[0], media: 'https://picsum.photos/seed/s1/300/500', createdAt: '1h ago', viewedBy: ['u2', 'u3', 'u4'] },
  { id: 's2', author: mockUsers[1], media: 'https://picsum.photos/seed/s2/300/500', createdAt: '3h ago', viewedBy: ['u1'] },
  { id: 's3', author: mockUsers[2], media: 'https://picsum.photos/seed/s3/300/500', createdAt: '8h ago', viewedBy: ['u1', 'u4'] },
  { id: 's4', author: mockUsers[3], media: 'https://picsum.photos/seed/s4/300/500', createdAt: '12h ago', viewedBy: [] },
];

export const mockOpportunities: Opportunity[] = [
  { id: 'o1', title: 'Frontend Developer Internship', type: 'Job', description: 'Join our team to build amazing user experiences.', postedBy: mockUsers[0], link: '#', deadline: '2024-08-30' },
  { id: 'o2', title: 'Tech for Good Scholarship', type: 'Scholarship', description: 'A scholarship for students using technology to make a positive impact.', postedBy: mockUsers[2], link: '#', deadline: '2024-09-15' },
  { id: 'o3', title: 'Youth Mental Health Hackathon', type: 'Event', description: 'A 2-day event to build solutions for youth mental wellness.', postedBy: mockUsers[0], link: '#' },
];

export const mockReports: Report[] = [
  { id: 'r1', reportedContentId: 'p2', reportedBy: mockUsers[3], reason: 'Potentially sensitive content, checking for self-harm flags.', status: 'pending' },
  { id: 'r2', reportedContentId: 'c2', reportedBy: mockUsers[1], reason: 'This comment seems like spam.', status: 'pending' },
];

export const mockMoodData = [
    { date: 'Mon', [Mood.Joyful]: 40, [Mood.Happy]: 24, [Mood.Neutral]: 15, [Mood.Sad]: 8, [Mood.Angry]: 3 },
    { date: 'Tue', [Mood.Joyful]: 30, [Mood.Happy]: 30, [Mood.Neutral]: 20, [Mood.Sad]: 10, [Mood.Angry]: 2 },
    { date: 'Wed', [Mood.Joyful]: 20, [Mood.Happy]: 40, [Mood.Neutral]: 20, [Mood.Sad]: 12, [Mood.Angry]: 5 },
    { date: 'Thu', [Mood.Joyful]: 27, [Mood.Happy]: 33, [Mood.Neutral]: 18, [Mood.Sad]: 15, [Mood.Angry]: 7 },
    { date: 'Fri', [Mood.Joyful]: 50, [Mood.Happy]: 25, [Mood.Neutral]: 10, [Mood.Sad]: 5, [Mood.Angry]: 1 },
    { date: 'Sat', [Mood.Joyful]: 60, [Mood.Happy]: 20, [Mood.Neutral]: 8, [Mood.Sad]: 2, [Mood.Angry]: 1 },
    { date: 'Sun', [Mood.Joyful]: 55, [Mood.Happy]: 22, [Mood.Neutral]: 13, [Mood.Sad]: 6, [Mood.Angry]: 4 },
];

export const mockResources = [
    { title: "Crisis Text Line", description: "Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.", category: "Hotlines" },
    { title: "The Trevor Project", description: "The leading national organization providing crisis intervention and suicide prevention services to LGBTQ young people.", category: "Hotlines" },
    { title: "Understanding Anxiety", description: "An article explaining the common causes and symptoms of anxiety in young adults.", category: "Articles" },
    { title: "Tips for Better Sleep", description: "Struggling with sleep? Here are some scientifically-backed tips to improve your sleep hygiene.", category: "Articles" },
    { title: "How to Support a Friend", description: "Learn how to be there for a friend who is going through a tough time.", category: "Guides" },
];