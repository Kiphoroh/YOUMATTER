
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { Conversation, ChatMessage, User, Post } from '../types';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatWindow } from '../components/chat/ChatWindow';
import { GoogleGenAI, Chat } from "@google/genai";
import { PostViewerModal } from '../components/modals/PostViewerModal';

// This data is now only used to seed the initial community chat for a new user.
const initialCommunityChat = {
    id: 'community',
    // Fix: Add type assertion to prevent type widening to 'string'.
    type: 'group' as const,
    name: 'Community Chat',
    messages: [
      { id: 'm3', sender: { id: 'u1' }, content: 'Hello! Welcome to the community chat. Feel free to share anything on your mind.', createdAt: '10:02 AM' },
      { id: 'm4', sender: { id: 'u4' }, content: 'Just wanted to share a win - I passed my exam! 🎉', createdAt: '10:05 AM' },
    ],
};


export const ChatPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { user, users: allUsersFromAuth } = useAuth();
  const { posts, likePost, addComment } = useData();
  const navigate = useNavigate();

  const AI_FRIEND_ID = 'aura';
  const CONVERSATIONS_STORAGE_KEY = useMemo(() => user ? `youmatter_conversations_${user.id}` : null, [user]);
  const AI_CONVERSATION_ID = useMemo(() => user ? `ai-chat-${user.id}` : null, [user]);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [aiChat, setAiChat] = useState<Chat | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [aiFriendUser, setAiFriendUser] = useState<User | null>(null);

  useEffect(() => {
    const aiUser = allUsersFromAuth.find(u => u.id === AI_FRIEND_ID);
    if(aiUser) setAiFriendUser(aiUser);
  }, [allUsersFromAuth]);

  // Initialize conversations from localStorage or mock data
  useEffect(() => {
    if (!user || !CONVERSATIONS_STORAGE_KEY || !AI_CONVERSATION_ID || !aiFriendUser) return;
    
    const savedConversations = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    let allConversations: Conversation[];
    
    if (savedConversations) {
        allConversations = JSON.parse(savedConversations);
    } else {
        // First time setup for this user
        const aiConversation: Conversation = {
            id: AI_CONVERSATION_ID,
            type: 'private',
            participants: [user, aiFriendUser],
            messages: [{ id: 'ai-init', sender: aiFriendUser, content: 'Hello! I\'m AURA. I\'m here to listen and explore any thoughts or feelings you\'d like to share.', createdAt: 'Just now' }],
        };

        allConversations = [aiConversation];

        const communityChat: Conversation = {
            ...initialCommunityChat,
            // Re-link senders to full user objects for consistency
            messages: initialCommunityChat.messages.map(m => ({
                ...m,
                sender: allUsersFromAuth.find(u => u.id === m.sender.id) || m.sender,
            })) as ChatMessage[],
            participants: allUsersFromAuth.filter(u => u.id !== 'u5' && u.id !== 'aura'),
        };
        allConversations.unshift(communityChat); // Add community chat at the beginning
    }
    
    const conversationsWithLastMessage = allConversations.map(c => ({
        ...c,
        lastMessage: c.messages.length > 0 ? c.messages[c.messages.length - 1] : undefined,
    }));
    setConversations(conversationsWithLastMessage);
  }, [user, CONVERSATIONS_STORAGE_KEY, AI_CONVERSATION_ID, allUsersFromAuth, aiFriendUser]);

  // Persist conversations to localStorage on change
  useEffect(() => {
    if (CONVERSATIONS_STORAGE_KEY && conversations.length > 0) {
        localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations, CONVERSATIONS_STORAGE_KEY]);

  // Setup AI Chat instance
  useEffect(() => {
    const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are AURA, an empathetic and insightful AI companion on the YOUMATTER platform. Your purpose is to provide a safe, non-judgmental space for young adults to explore their thoughts and feelings. Respond with warmth, curiosity, and encouragement. Use a conversational and supportive tone. When appropriate, ask gentle, open-ended questions to help users reflect more deeply. Keep responses thoughtful but not overly long.',
        },
    });
    setAiChat(chat);
  }, []);

  // Set active conversation based on URL
  useEffect(() => {
    if (conversationId) {
      const foundConversation = conversations.find(c => c.id === conversationId);
      setActiveConversation(foundConversation || null);
    } else {
      setActiveConversation(null);
    }
  }, [conversationId, conversations]);

  const allUsers = useMemo(() => allUsersFromAuth.filter(u => u.id !== 'u5'), [allUsersFromAuth]); // Exclude anonymous

  const handleStartConversation = (otherUser: User) => {
    if (!user) return;
    
    const participantIds = [user.id, otherUser.id].sort().join('-');
    const existingConvo = conversations.find(c => c.id === `private-${participantIds}`);

    if (existingConvo) {
        navigate(`/chat/${existingConvo.id}`);
    } else {
        const newConvo: Conversation = {
            id: `private-${participantIds}`,
            type: 'private',
            participants: [user, otherUser],
            messages: [],
            lastMessage: undefined,
        };
        setConversations(prev => [...prev, newConvo]);
        navigate(`/chat/${newConvo.id}`);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversation || !user || !AI_CONVERSATION_ID || !aiFriendUser) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user,
      content,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updateConversationsState = (updatedConvo: Conversation) => {
        setConversations(prev => prev.map(c => c.id === updatedConvo.id ? updatedConvo : c));
        setActiveConversation(updatedConvo);
    }
    
    const updatedConvoWithUserMessage = {
        ...activeConversation,
        messages: [...activeConversation.messages, userMessage],
        lastMessage: userMessage,
    };
    updateConversationsState(updatedConvoWithUserMessage);

    if (activeConversation.id === AI_CONVERSATION_ID && aiChat) {
      setIsAiTyping(true);
      try {
        const response = await aiChat.sendMessage({ message: content });
        const aiMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: aiFriendUser,
          content: response.text,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        const finalConvo = {...updatedConvoWithUserMessage, messages: [...updatedConvoWithUserMessage.messages, aiMessage], lastMessage: aiMessage};
        updateConversationsState(finalConvo);
      } catch (error) {
        console.error("Error sending message to AI:", error);
        const errorMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            sender: aiFriendUser,
            content: 'Sorry, I\'m having a little trouble connecting right now. Please try again in a moment.',
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        const convoWithError = {...updatedConvoWithUserMessage, messages: [...updatedConvoWithUserMessage.messages, errorMessage], lastMessage: errorMessage};
        updateConversationsState(convoWithError);
      } finally {
        setIsAiTyping(false);
      }
    }
  };

  const handleViewPost = (postId: string) => {
      const post = posts.find(p => p.id === postId);
      if(post) setViewingPost(post);
  }

  if (!user) return null;

  return (
    <>
        <div className="flex h-screen">
        <div className="hidden md:flex flex-shrink-0">
            <ChatSidebar 
                conversations={conversations}
                currentUser={user}
                allUsers={allUsers}
                onStartConversation={handleStartConversation}
            />
        </div>
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
            <div className="md:hidden h-full">
                {activeConversation ? (
                    <ChatWindow 
                        conversation={activeConversation}
                        currentUser={user}
                        onSendMessage={handleSendMessage}
                        onViewPost={handleViewPost}
                        isAiTyping={activeConversation.id === AI_CONVERSATION_ID && isAiTyping}
                    />
                ) : (
                    <ChatSidebar 
                        conversations={conversations}
                        currentUser={user}
                        allUsers={allUsers}
                        onStartConversation={handleStartConversation}
                    />
                )}
            </div>
            <div className="hidden md:flex flex-1 h-full">
                {activeConversation ? (
                    <ChatWindow 
                        conversation={activeConversation}
                        currentUser={user}
                        onSendMessage={handleSendMessage}
                        onViewPost={handleViewPost}
                        isAiTyping={activeConversation.id === AI_CONVERSATION_ID && isAiTyping}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            <h2 className="text-2xl font-semibold mt-4">Select a conversation</h2>
                            <p>Choose from your existing chats or start a new one.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
        <PostViewerModal 
            isOpen={!!viewingPost}
            onClose={() => setViewingPost(null)}
            post={viewingPost}
            onLikePost={likePost}
            onAddComment={addComment}
        />
    </>
  );
};