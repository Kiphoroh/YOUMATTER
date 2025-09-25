
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

const USERS_STORAGE_KEY = 'youmatter_users';
const CURRENT_USER_STORAGE_KEY = 'youmatter_currentUser';

type RegistrationData = Pick<User, 'name' | 'username' | 'password' | 'age' | 'phoneNumber'>;

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegistrationData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updatedData: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  updateUserRole: (userId: string, role: User['role']) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fix: Use React.PropsWithChildren to correctly type the component with children, resolving the TypeScript error.
export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const storedUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
      return storedUsers ? JSON.parse(storedUsers) : mockUsers;
    } catch (error) {
      console.error("Failed to parse users from localStorage", error);
      return mockUsers;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
     try {
      const storedUser = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse current user from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
        console.error("Failed to save users to localStorage", error);
    }
  }, [users]);

  useEffect(() => {
    try {
        if (user) {
            window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
        }
    } catch (error) {
        console.error("Failed to save current user to localStorage", error);
    }
  }, [user]);

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const userToLogin = users.find(u => u.username === username);
    
    if (userToLogin && userToLogin.password === password) {
      setUser(userToLogin);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid username or password.' };
  };

  const register = async (data: RegistrationData): Promise<{ success: boolean; message?: string }> => {
    const usernameExists = users.some(u => u.username === data.username);
    if (usernameExists) {
        return { success: false, message: 'Username is already taken.' };
    }

    const newUser: User = {
        id: `u${users.length + 1}`,
        ...data,
        bio: 'New to YOUMATTER!',
        avatar: `https://i.pravatar.cc/150?u=u${users.length + 1}`,
        interests: [],
        role: 'user',
        points: 0,
        badges: ['Welcome'],
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    setUser(newUser);
    return { success: true };
  };
  
  const updateUser = async (updatedData: Partial<User>): Promise<{ success: boolean; message?: string }> => {
    if (!user) {
        return { success: false, message: 'No user is currently logged in.' };
    }
    
    const updatedUser = { ...user, ...updatedData };
    
    const updatedUsersList = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsersList);
    
    setUser(updatedUser);
    
    return { success: true };
  };

  const updateUserRole = async (userId: string, role: User['role']): Promise<{ success: boolean; message?: string }> => {
    setUsers(prevUsers => {
        const newUsers = prevUsers.map(u => {
            if (u.id === userId) {
                return { ...u, role };
            }
            return u;
        });
        // Also update the current user in state if their own role was changed
        if (user && user.id === userId) {
            setUser(prev => prev ? { ...prev, role } : null);
        }
        return newUsers;
    });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, isAuthenticated, updateUser, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
