import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-slide-in-up">
        <h1 className="text-4xl font-bold text-center text-primary mb-2">
          YOUMATTER
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Welcome! Your safe space awaits.
        </p>

        <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-1 mb-6">
          <button onClick={() => setAuthType('login')} className={`w-1/2 p-2 rounded-md transition ${authType === 'login' ? 'bg-primary text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}>Login</button>
          <button onClick={() => setAuthType('register')} className={`w-1/2 p-2 rounded-md transition ${authType === 'register' ? 'bg-primary text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}>Register</button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" placeholder="you@example.com" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" placeholder="••••••••" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-gray-100" />
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">For demo purposes, select a role to log in:</p>
           <div className="grid grid-cols-2 gap-4">
               <Button onClick={() => login('user')} fullWidth>
                Login as User
               </Button>
               <Button onClick={() => login('admin')} variant="secondary" fullWidth>
                Login as Admin
               </Button>
           </div>
        </div>

        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Google
                </button>
                 <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Phone (OTP)
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
