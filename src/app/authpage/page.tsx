// pages/authpage.tsx
"use client";

import React, { useState } from 'react';
import { Github, Mail, Lock, User } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface FirebaseAuthError {
  code: string;
  message: string;
  customData?: {
    email?: string;
  };
}

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="h-5 w-5"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l2.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.86-2.59 3.29-4.51 6.16-4.51z"
    />
  </svg>
);

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const router = useRouter();

  const logActivity = async (userId: string, type: string, details: any) => {
    try {
      const activityRef = doc(collection(db, 'users', userId, 'activity'));
      await setDoc(activityRef, {
        type,
        timestamp: new Date().toISOString(),
        details,
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const now = Date.now();
      await setDoc(userRef, {
        email: user.email,
        displayName: username || user.email?.split('@')[0],
        role: 'user',
        createdAt: now,
        lastActive: now,
      });

      await logActivity(user.uid, 'signup', { email: user.email, method: 'email' });

      console.log('User signed up:', user);
      toast.success('Sign Up Successful');
      router.push('/');
    } catch (error) {
      const authError = error as FirebaseAuthError;
      console.error('Sign Up Error:', authError);
      toast.error('Sign Up Failed: ' + authError.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await logActivity(user.uid, 'login', { email: user.email, method: 'email' });

      console.log('User logged in:', user);
      toast.success('Login Successful');
      router.push('/');
    } catch (error) {
      const authError = error as FirebaseAuthError;
      console.error('Login Error:', authError);
      toast.error('Login Failed: ' + authError.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const now = Date.now();
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          role: 'user',
          createdAt: now,
          lastActive: now,
        });
      }

      await logActivity(user.uid, 'login', { email: user.email, method: 'google' });

      console.log('Google Sign-In:', user);
      toast.success('Google Authentication Successful');
      router.push('/');
    } catch (error) {
      const authError = error as FirebaseAuthError;
      console.error('Google Auth Error:', authError);
      toast.error('Google Authentication Failed: ' + authError.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const now = Date.now();
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          role: 'user',
          createdAt: now,
          lastActive: now,
        });
      }

      await logActivity(user.uid, 'login', { email: user.email, method: 'github' });

      console.log('Github Sign-In:', user);
      toast.success('Github Authentication Successful');
      router.push('/');
    } catch (error) {
      const authError = error as FirebaseAuthError;
      console.error('Github Auth Error:', authError);
      toast.error('Github Authentication Failed: ' + authError.message);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      toast.success('Password reset email sent! Please check your inbox.');
      setIsForgotPasswordOpen(false);
      setForgotEmail('');
    } catch (error) {
      const authError = error as FirebaseAuthError;
      console.error('Forgot Password Error:', authError);
      switch (authError.code) {
        case 'auth/invalid-email':
          toast.error('Invalid email address.');
          break;
        case 'auth/user-not-found':
          toast.error('No user found with this email.');
          break;
        case 'auth/too-many-requests':
          toast.error('Too many requests. Please try again later.');
          break;
        default:
          toast.error('Failed to send password reset email.');
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br pt-28 from-indigo-100 to-purple-100 p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
          <p className="text-gray-500">Sign in or create an account</p>
        </div>

        <div className="flex mb-4">
          <button
            className={`w-1/2 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' && !isForgotPasswordOpen ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="flex items-center mb-2">
                <Mail className="mr-2 h-4 w-4" /> Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className="flex items-center mb-2">
                <Lock className="mr-2 h-4 w-4" /> Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-500 hover:underline"
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        ) : activeTab === 'login' && isForgotPasswordOpen ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label htmlFor="forgot-email" className="flex items-center mb-2">
                <Mail className="mr-2 h-4 w-4" /> Email
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="text-sm text-gray-500 hover:underline"
                onClick={() => setIsForgotPasswordOpen(false)}
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
                disabled={isResetting}
              >
                {isResetting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <label htmlFor="signup-username" className="flex items-center mb-2">
                <User className="mr-2 h-4 w-4" /> Username
              </label>
              <input
                id="signup-username"
                type="text"
                placeholder="Choose a username"
                className="w-full p-2 border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="flex items-center mb-2">
                <Mail className="mr-2 h-4 w-4" /> Email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="flex items-center mb-2">
                <Lock className="mr-2 h-4 w-4" /> Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                className="w-full p-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100 transition"
            onClick={signInWithGoogle}
          >
            <GoogleIcon />
            Sign in with Google
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 py-2 border rounded-md hover:bg-gray-100 transition"
            onClick={signInWithGithub}
          >
            <Github className="h-5 w-5" />
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;